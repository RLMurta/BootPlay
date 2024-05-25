package br.com.sysmap.bootcamp.domain.service;

import br.com.sysmap.bootcamp.domain.repository.WalletRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
public class WalletServiceTest {

    @Autowired
    private WalletService walletService;
    @Autowired
    private WalletRepository walletRepository;

    @Test
    @DisplayName("Should return wallet when valid wallet is debited")
    public void shouldReturnWalletWhenValidWalletIsDebited() {

    }

    @Test
    @DisplayName("Should return wallet when valid wallet is credited")
    public void shouldReturnWalletWhenValidWalletIsCredited() {

    }

    @Test
    @DisplayName("Should return wallet when valid email is found")
    public void shouldReturnWalletWhenValidEmailIsFound() {

    }
}
