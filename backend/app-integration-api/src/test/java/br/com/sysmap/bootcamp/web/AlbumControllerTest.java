package br.com.sysmap.bootcamp.web;

import br.com.sysmap.bootcamp.domain.entities.Album;
import br.com.sysmap.bootcamp.domain.service.AlbumService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@ActiveProfiles("test")
public class AlbumControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    EntityManager entityManager;
    @Mock
    private AlbumService albumService;
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setup() {
        objectMapper = new ObjectMapper();
    }

    private Album createAlbum() {
        return null;
    }

    @Test
    @WithMockUser(username = "test@test.com", password = "password", roles = "USER")
    @DisplayName("Should return albums when valid search is passed")
    public void shouldReturnAlbumsWhenValidSearchIsPassed() throws Exception {

    }

    @Test
    @WithMockUser(username = "test@test.com", password = "password", roles = "USER")
    @DisplayName("Should return album when valid album is bought")
    public void shouldReturnAlbumWhenValidAlbumIsBought() throws Exception {

    }

    @Test
    @WithMockUser(username = "test@test.com", password = "password", roles = "USER")
    @DisplayName("Should return albums when valid collection is requested")
    public void shouldReturnAlbumsWhenValidCollectionIsRequested() throws Exception {

    }

    @Test
    @WithMockUser(username = "test@test.com", password = "password", roles = "USER")
    @DisplayName("Should return no content when valid album is removed")
    public void shouldReturnNoContentWhenValidAlbumIsRemoved() throws Exception {

    }
}
