package br.com.sysmap.bootcamp.domain.service;

import br.com.sysmap.bootcamp.domain.entities.Users;
import br.com.sysmap.bootcamp.domain.entities.Wallet;
import br.com.sysmap.bootcamp.domain.events.UserCreatedEvent;
import br.com.sysmap.bootcamp.domain.repository.WalletRepository;
import br.com.sysmap.bootcamp.dto.WalletDto;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class WalletService {

    private final UsersService usersService;
    private final WalletRepository walletRepository;

    public Wallet debit(WalletDto walletDto) {
        Users users = usersService.findByEmail(walletDto.getEmail());
        Wallet wallet = walletRepository.findByUsers(users).orElseThrow();
        wallet.setBalance(wallet.getBalance().subtract(walletDto.getValue()));
        // The constant returned by getDayOfWeek() is a value from 1 to 7 representing the day-of-week.
        List<Integer> points = List.of(7, 6, 2, 10, 15, 20, 25);
        LocalDateTime today = LocalDateTime.now();
        DayOfWeek dayOfWeek = today.getDayOfWeek();
        wallet.setPoints(wallet.getPoints() + points.get(dayOfWeek.getValue() - 1));
        wallet.setLastUpdate(LocalDateTime.now());
        walletRepository.save(wallet);
        return wallet;
    }

    public Wallet credit(String email, BigDecimal value) {
        Users users = usersService.findByEmail(email);
        Wallet wallet = walletRepository.findByUsers(users).orElseThrow();
        wallet.setBalance(wallet.getBalance().add(value));
        wallet.setLastUpdate(LocalDateTime.now());
        walletRepository.save(wallet);
        return wallet;
    }

    public Wallet getWallet(String email) {
        Users users = usersService.findByEmail(email);
        return walletRepository.findByUsers(users).orElseThrow();
    }

    @EventListener
    public void handleUserCreatedEvent(UserCreatedEvent event) {
        Users user = event.getUser();
        Wallet wallet = Wallet.builder()
                .balance(BigDecimal.valueOf(0))
                .lastUpdate(LocalDateTime.now())
                .points(0L)
                .users(user)
                .build();
        this.walletRepository.save(wallet);
    }
}
