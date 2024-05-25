package br.com.sysmap.bootcamp.domain.service;


import br.com.sysmap.bootcamp.domain.entities.Users;
import br.com.sysmap.bootcamp.domain.events.UserCreatedEvent;
import br.com.sysmap.bootcamp.domain.exceptions.CustomApiException;
import br.com.sysmap.bootcamp.domain.repository.UsersRepository;
import br.com.sysmap.bootcamp.dto.AuthDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Slf4j
@Service
public class UsersService implements UserDetailsService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional(propagation = Propagation.REQUIRED)
    public Users save(Users user) {

        if(user.getEmail() == null || user.getEmail().isEmpty() || user.getEmail().isBlank()) {
            throw new CustomApiException("User Email is required");
        }
        if(user.getName() == null || user.getName().isEmpty() || user.getName().isBlank()) {
            throw new CustomApiException("User Name is required");
        }
        if(user.getPassword() == null || user.getPassword().isEmpty() || user.getPassword().isBlank()) {
            throw new CustomApiException("User Password is required");
        }
        Optional<Users> usersOptional = this.usersRepository.findByEmail(user.getEmail());
        if (usersOptional.isPresent()) {
            throw new CustomApiException("User already exists");
        }

        user = user.toBuilder().password(this.passwordEncoder.encode(user.getPassword())).build();

        Users savedUser = this.usersRepository.save(user);
        eventPublisher.publishEvent(new UserCreatedEvent(this, savedUser));

        log.info("Saving user: {}", user);
        return this.usersRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Users> usersOptional = this.usersRepository.findByEmail(username);

        return usersOptional.map(users -> new User(users.getEmail(), users.getPassword(), new ArrayList<GrantedAuthority>()))
                .orElseThrow(() -> new UsernameNotFoundException("User not found" + username));
    }

    public Users findByEmail(String email) {
        return this.usersRepository.findByEmail(email).orElseThrow(() -> new CustomApiException("User not found"));
    }

    public AuthDto auth(AuthDto authDto) {
        Users users = this.findByEmail(authDto.getEmail());

        if (!this.passwordEncoder.matches(authDto.getPassword(), users.getPassword())) {
            throw new CustomApiException("Invalid password");
        }

        StringBuilder password = new StringBuilder().append(users.getEmail()).append(":").append(users.getPassword());

        return AuthDto.builder().email(users.getEmail()).token(
                Base64.getEncoder().withoutPadding().encodeToString(password.toString().getBytes())
        ).id(users.getId()).build();
    }

    public Users update(Users user) {
        Users existingUser = this.usersRepository.findById(user.getId()).orElseThrow(() -> new CustomApiException("User not found"));
        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        return this.usersRepository.save(existingUser);
    }

    public List<Users> getAllUsers() {
        List<Users> users = this.usersRepository.findAll();
        if (users.isEmpty()) {
            throw new CustomApiException("No users found");
        }
        return users;
    }

    public Users findById(Long id) {
        return this.usersRepository.findById(id).orElseThrow(() -> new CustomApiException("User not found"));
    }
}