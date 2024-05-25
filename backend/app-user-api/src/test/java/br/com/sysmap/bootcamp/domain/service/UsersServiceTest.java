package br.com.sysmap.bootcamp.domain.service;

import br.com.sysmap.bootcamp.domain.entities.Users;
import br.com.sysmap.bootcamp.domain.entities.Wallet;
import br.com.sysmap.bootcamp.domain.repository.UsersRepository;
import br.com.sysmap.bootcamp.domain.repository.WalletRepository;
import br.com.sysmap.bootcamp.dto.AuthDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@ActiveProfiles("test")
public class UsersServiceTest {

    @Autowired
    private UsersService usersService;
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private WalletRepository walletRepository;

    @Test
    @DisplayName("Should return users when valid users is saved")
    public void shouldReturnUsersWhenValidUsersIsSaved() {
        Users users = Users.builder().id(1L).name("teste").email("test").password("teste").build();

        Users savedUsers = usersService.save(users);

        assertEquals(users.getName(), savedUsers.getName());
        assertEquals(users.getEmail(), savedUsers.getEmail());

        Optional<Wallet> walletOptional = walletRepository.findByUsers(savedUsers);
        assertTrue(walletOptional.isPresent());
        assertEquals(savedUsers.getName(), walletOptional.get().getUsers().getName());
        assertEquals(savedUsers.getEmail(), walletOptional.get().getUsers().getEmail());
    }

    @Test
    @DisplayName("Should return userDetails when valid username is found")
    public void shouldReturnUserDetailsWhenValidUsernameIsFound() {
        Users users = Users.builder().id(1L).name("teste").email("test").password("teste").build();
        usersService.save(users);

        UserDetails userDetails = usersService.loadUserByUsername(users.getEmail());

        assertEquals(users.getEmail(), userDetails.getUsername());
    }

    @Test
    @DisplayName("Should return user when valid email is found")
    public void shouldReturnUserWhenValidEmailIsFound() {
        Users users = Users.builder().id(1L).name("teste").email("test").password("teste").build();
        usersService.save(users);

        Users returnedUser = usersService.findByEmail(users.getEmail());

        assertEquals(users.getEmail(), returnedUser.getEmail());
    }

    @Test
    @DisplayName("Should return auth object with token")
    public void shouldReturnAuthObjectWithToken() {
        Users users = Users.builder().id(1L).name("teste").email("test").password("teste").build();
        usersService.save(users);

        AuthDto authDto = AuthDto.builder().email(users.getEmail()).password(users.getPassword()).build();

        AuthDto returnedAuthDto = usersService.auth(authDto);

        assertEquals(users.getEmail(), returnedAuthDto.getEmail());
        assertEquals(users.getId(), returnedAuthDto.getId());
        assertTrue(returnedAuthDto.getToken().length() > 0);
    }

    @Test
    @DisplayName("Should return modified user")
    public void shouldReturnModifiedUser() {
        Users users = Users.builder().id(1L).name("teste").email("test").password("teste").build();
        usersService.save(users);

        Users modifiedUser = Users.builder().id(1L).name("new name").email("new email").password("new password").build();

        Users returnedUser = usersService.update(modifiedUser);

        assertEquals(modifiedUser.getEmail(), returnedUser.getEmail());
        assertEquals(modifiedUser.getName(), returnedUser.getName());
    }

    @Test
    @DisplayName("Should return all users")
    public void shouldReturnAllUsers() {
        Users users = Users.builder().id(1L).name("teste").email("test").password("teste").build();
        usersService.save(users);

        Users users2 = Users.builder().id(2L).name("teste2").email("test2").password("teste2").build();
        usersService.save(users2);

        assertEquals(2, usersService.getAllUsers().size());
    }

    @Test
    @DisplayName("Should return user when valid id is found")
    public void shouldReturnUserWhenValidIdIsFound() {
        Users users = Users.builder().id(1L).name("teste").email("test").password("teste").build();
        usersService.save(users);

        Users returnedUser = usersService.findById(users.getId());

        assertEquals(users.getId(), returnedUser.getId());
    }
}