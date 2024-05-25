package br.com.sysmap.bootcamp.domain.service;

import br.com.sysmap.bootcamp.domain.entities.Album;
import br.com.sysmap.bootcamp.domain.entities.Users;
import br.com.sysmap.bootcamp.domain.exceptions.CustomApiException;
import br.com.sysmap.bootcamp.domain.model.AlbumModel;
import br.com.sysmap.bootcamp.domain.repository.AlbumRepository;
import br.com.sysmap.bootcamp.domain.service.integration.SpotifyApi;
import br.com.sysmap.bootcamp.dto.WalletDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.hc.core5.http.ParseException;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
public class AlbumService {

    private final Queue queue;
    private final RabbitTemplate template;
    private final SpotifyApi spotifyApi;
    private final AlbumRepository albumRepository;
    private final UsersService usersService;

    public List<AlbumModel> getAlbums(String search) throws IOException, ParseException, SpotifyWebApiException {
        return this.spotifyApi.getAlbums(search);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public Album saveAlbum(Album album) {
        Users user = getUser();
        List<Album> albums = albumRepository.findAllByUsersAndIdSpotify(user, album.getIdSpotify());
        if (albums.size() >= 1) {
            throw new CustomApiException("Recurrent Spotify ID");
        }
        album.setUsers(user);
        Album albumSaved = albumRepository.save(album);

        WalletDto walletDto = new WalletDto(albumSaved.getUsers().getEmail(), albumSaved.getValue());
        this.template.convertAndSend(queue.getName(), walletDto);

        return albumSaved;
    }

    private Users getUser() {
        String username = SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal().toString();
        return this.usersService.findByEmail(username);
    }

    public List<Album> getMyCollection() {
        List<Album> albums = this.albumRepository.findAllByUsers(getUser());
        if (albums.isEmpty()) {
            throw new CustomApiException("No albums found");
        }
        return albums;
    }

    public void removeAlbum(Long id) {
        Album album = this.albumRepository.findById(id).orElseThrow(() -> new CustomApiException("Album not found"));
        this.albumRepository.deleteById(id);
    }
}