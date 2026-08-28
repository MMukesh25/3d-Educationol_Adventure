package com.adventure.controller;

import com.adventure.dto.AvatarUpdateDto;
import com.adventure.dto.ChildProfileDto;
import com.adventure.service.ChildService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/child")
@RequiredArgsConstructor
public class ChildController {

    private final ChildService childService;

    @GetMapping("/me")
    public ResponseEntity<ChildProfileDto> getMyProfile(Authentication authentication) {
        String username = authentication.getName();
        ChildProfileDto profile = childService.getProfileByUsername(username);
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/avatar")
    public ResponseEntity<ChildProfileDto> updateAvatar(
            Authentication authentication,
            @Valid @RequestBody AvatarUpdateDto avatarUpdateDto
    ) {
        String username = authentication.getName();
        ChildProfileDto profile = childService.updateAvatar(username, avatarUpdateDto);
        return ResponseEntity.ok(profile);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChildProfileDto> getProfileById(@PathVariable Long id) {
        ChildProfileDto profile = childService.getProfileById(id);
        return ResponseEntity.ok(profile);
    }
}
