package br.com.sysmap.bootcamp.web;

import br.com.sysmap.bootcamp.domain.entities.Users;
import br.com.sysmap.bootcamp.domain.service.UsersService;
import br.com.sysmap.bootcamp.dto.AuthDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Users", description = "Users API")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UsersController {

    private final UsersService usersService;

    // POST --> Save user
    @Operation(summary = "Save user")
    @PostMapping("/create")
    public ResponseEntity<Users> save(@RequestBody Users user) {
        return ResponseEntity.ok(this.usersService.save(user));
    }

    // AUTH --> Authenticate user (email, password)
    @Operation(summary = "Auth user")
    @PostMapping("/auth")
    public ResponseEntity<AuthDto> auth(@RequestBody AuthDto user) {
        return ResponseEntity.ok(this.usersService.auth(user));
    }

    // PUT --> Update user
    @Operation(summary = "Update user")
    @PutMapping("update")
    public ResponseEntity<Users> update(@RequestBody Users user) {
        return ResponseEntity.ok(this.usersService.update(user));
    }

    // GET --> Get all users
    @Operation(summary = "List users")
    @GetMapping
    public ResponseEntity<List<Users>> getAllUsers() {
        return ResponseEntity.ok(this.usersService.getAllUsers());
    }

    // GET/{id} --> Get one user by id
    @Operation(summary = "Get user by id")
    @GetMapping("/{id}")
    public ResponseEntity<Users> getById(@PathVariable Long id) {
        return ResponseEntity.ok(this.usersService.findById(id));
    }
}
