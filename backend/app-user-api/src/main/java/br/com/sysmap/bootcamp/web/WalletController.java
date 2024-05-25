package br.com.sysmap.bootcamp.web;

import br.com.sysmap.bootcamp.domain.entities.Wallet;
import br.com.sysmap.bootcamp.domain.service.WalletService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@Tag(name = "Wallet", description = "Wallet API")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/wallet")
public class WalletController {

    private final WalletService walletService;

    // POST --> Credit wallet
    @Operation(summary = "Credit value in wallet")
    @PostMapping("/credit/{value}")
    public ResponseEntity<Wallet> credit(String email, BigDecimal value) {
        return ResponseEntity.ok(this.walletService.credit(email, value));
    }

    // GET --> Get wallet
    @Operation(summary = "My wallet")
    @GetMapping
    public ResponseEntity<Wallet> getWallet(String email) {
        return ResponseEntity.ok(this.walletService.getWallet(email));
    }
}
