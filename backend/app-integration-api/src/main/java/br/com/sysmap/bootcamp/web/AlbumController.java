package br.com.sysmap.bootcamp.web;

import br.com.sysmap.bootcamp.domain.entities.Album;
import br.com.sysmap.bootcamp.domain.model.AlbumModel;
import br.com.sysmap.bootcamp.domain.service.AlbumService;
import br.com.sysmap.bootcamp.domain.service.integration.SpotifyApi;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.apache.hc.core5.http.ParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*")
@Tag(name = "Albums", description = "Albums API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/albums")
public class AlbumController {

    private final AlbumService albumService;

    @Operation(summary = "Get all albums from Spotify service by Text parameter")
    @GetMapping("/all")
    public ResponseEntity<List<AlbumModel>> getAlbums(@RequestParam("search") String search) throws IOException, ParseException, SpotifyWebApiException {
        return ResponseEntity.ok(this.albumService.getAlbums(search));
    }

    @Operation(summary = "Buy an album")
    @PostMapping("/sale")
    public ResponseEntity<Album> saveAlbum(@RequestBody Album album) {
        return ResponseEntity.ok(this.albumService.saveAlbum(album));
    }

    @Operation(summary = "Get all albums from my collection")
    @GetMapping("/my-collection")
    public ResponseEntity<List<Album>> getMyCollection() {
        return ResponseEntity.ok(this.albumService.getMyCollection());
    }

    @Operation(summary = "Remove an album by id")
    @DeleteMapping("/remove/{id}")
    public ResponseEntity<Void> removeAlbum(@PathVariable Long id) {
        this.albumService.removeAlbum(id);
        return ResponseEntity.noContent().build();
    }
}
