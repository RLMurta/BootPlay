package br.com.sysmap.bootcamp.web;

import br.com.sysmap.bootcamp.domain.entities.Users;
import br.com.sysmap.bootcamp.domain.entities.Wallet;
import br.com.sysmap.bootcamp.domain.service.UsersService;
import br.com.sysmap.bootcamp.domain.service.WalletService;
import br.com.sysmap.bootcamp.dto.WalletDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@Transactional
@ActiveProfiles("test")
public class WalletControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Mock
    private WalletService walletService;
    @Mock
    private UsersService usersService;
    private ObjectMapper objectMapper;
    @Autowired
    EntityManager entityManager;

    @BeforeEach
    public void setup() {
        objectMapper = new ObjectMapper();
    }

    @Transactional
    @WithMockUser(username = "Teste@teste.com", password = "123456", roles = "USER")
    private Users createUsers() {
        Users users = Users.builder()
                .name("Teste")
                .email("Teste@teste.com")
                .password("123456")
                .build();
        this.entityManager.persist(users);
        this.entityManager.flush();
        return users;
    }

    @Transactional
    @WithMockUser(username = "Teste@teste.com", password = "123456", roles = "USER")
    private Wallet createWallet(Users users) {
        Wallet wallet = new Wallet();
        wallet.setBalance(BigDecimal.valueOf(100));
        wallet.setPoints(0L);
        wallet.setLastUpdate(LocalDateTime.now());
        wallet.setUsers(users);
        this.entityManager.persist(wallet);
        this.entityManager.flush();
        return wallet;
    }

    @Test
    @WithMockUser(username = "Teste@teste.com", password = "123456", roles = "USER")
    @DisplayName("Should return wallet with credited value")
    public void shouldReturnWalletWithCreditedValue() throws Exception {
        Users users = createUsers();
        Wallet wallet = createWallet(users);
        WalletDto walletDto = new WalletDto("Teste@teste.com", BigDecimal.valueOf(100));

        when(walletService.credit("Teste@teste.com", BigDecimal.valueOf(100))).thenReturn(wallet);

        mockMvc.perform(post("/wallet/credit/100")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(walletDto)))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "test@test.com", password = "password", roles = "USER")
    @DisplayName("Should return wallet by email")
    public void shouldReturnWalletByEmail() throws Exception {

    }
}
