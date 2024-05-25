package br.com.sysmap.bootcamp.domain.service;

import br.com.sysmap.bootcamp.domain.repository.UsersRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
public class UsersServiceTest {

    @Autowired
    private UsersService usersService;
    @Mock
    private UsersRepository usersRepository;

    @Test
    @DisplayName("Should return userDetails when valid username is found")
    public void shouldReturnUserDetailsWhenValidUsernameIsFound() {

    }

    @Test
    @DisplayName("Should return user when valid email is found")
    public void shouldReturnUserWhenValidEmailIsFound() {

    }
}
