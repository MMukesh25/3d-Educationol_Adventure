package com.adventure.controller;

import com.adventure.dto.AttemptResultResponse;
import com.adventure.dto.AttemptSubmitRequest;
import com.adventure.service.GameService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/game")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @PostMapping("/attempt/submit")
    public ResponseEntity<AttemptResultResponse> submitAttempt(
            Authentication authentication,
            @Valid @RequestBody AttemptSubmitRequest request
    ) {
        String username = authentication.getName();
        AttemptResultResponse result = gameService.evaluateAttempt(username, request);
        return ResponseEntity.ok(result);
    }
}
