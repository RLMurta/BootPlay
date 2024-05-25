package br.com.sysmap.bootcamp.web;

import br.com.sysmap.bootcamp.domain.entities.Users;
import br.com.sysmap.bootcamp.domain.service.UsersService;
import br.com.sysmap.bootcamp.dto.AuthDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@ActiveProfiles("test")
public class UsersControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Mock
    private UsersService usersService;
    private ObjectMapper objectMapper;
    private Users users;

    @BeforeEach
    public void setup() {
        objectMapper = new ObjectMapper();
        users = Users.builder().id(1L).name("teste").email("test@test.com").password("password").build();
    }

    @Test
    @DisplayName("Should return users when valid users is saved")
    public void shouldReturnUsersWhenValidUsersIsSaved() throws Exception {

        when(usersService.save(this.users)).thenReturn(this.users);

        mockMvc.perform(post("/users/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(this.users)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(this.users.getEmail()))
                .andExpect(jsonPath("$.name").value(this.users.getName()));
    }

    @Test
    @DisplayName("Should Return Auth Token")
    public void shouldReturnAuthToken() throws Exception {
        this.shouldReturnUsersWhenValidUsersIsSaved();
        AuthDto authDto = new AuthDto();
        authDto.setEmail(this.users.getEmail());
        authDto.setPassword(this.users.getPassword());
        authDto.setId(1L);

        when(usersService.auth(authDto)).thenReturn(authDto);

        mockMvc.perform(post("/users/auth")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(authDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token", Matchers.hasLength(99)));
    }

    @Test
    @WithMockUser(username = "test@test.com", password = "password", roles = "USER")
    @DisplayName("Should return modified user")
    public void shouldReturnModifiedUser() throws Exception {
        this.shouldReturnUsersWhenValidUsersIsSaved();
        Users modifiedUser = Users.builder().id(1L).name("new name").email("new email").password("new password").build();

        when(usersService.update(modifiedUser)).thenReturn(modifiedUser);

        mockMvc.perform(put("/users/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(modifiedUser)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(modifiedUser.getEmail()))
                .andExpect(jsonPath("$.name").value(modifiedUser.getName()));
    }

    @Test
    @WithMockUser(username = "test@test.com", password = "password", roles = "USER")
    @DisplayName("Should return all users")
    public void shouldReturnAllUsers() throws Exception {
        this.shouldReturnUsersWhenValidUsersIsSaved();
        List<Users> usersList = new ArrayList<>();
        usersList.add(users);

        Mockito.when(usersService.getAllUsers()).thenReturn(usersList);

        mockMvc.perform(get("/users")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].email").value(users.getEmail()))
                .andExpect(jsonPath("$[0].name").value(users.getName()));
    }

    @Test
    @WithMockUser(username = "test@test.com", password = "password", roles = "USER")
    @DisplayName("Should return user by id")
    public void shouldReturnUserById() throws Exception {
        this.shouldReturnUsersWhenValidUsersIsSaved();

        Mockito.when(usersService.findById(1L)).thenReturn(users);

        mockMvc.perform(get("/users/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(users.getEmail()))
                .andExpect(jsonPath("$.name").value(users.getName()));
    }
}
