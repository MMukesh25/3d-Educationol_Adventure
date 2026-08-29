package com.adventure.controller;

import com.adventure.dto.AdminStatsDto;
import com.adventure.entity.Activity;
import com.adventure.entity.Reward;
import com.adventure.entity.User;
import com.adventure.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsDto> getPlatformStats() {
        return ResponseEntity.ok(adminService.getPlatformStats());
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @GetMapping("/activities")
    public ResponseEntity<List<Activity>> getAllActivities() {
        return ResponseEntity.ok(adminService.getAllActivities());
    }

    @PostMapping("/activities")
    public ResponseEntity<Activity> createActivity(@Valid @RequestBody Activity activity) {
        return ResponseEntity.ok(adminService.createActivity(activity));
    }

    @DeleteMapping("/activities/{id}")
    public ResponseEntity<Void> deleteActivity(@PathVariable Long id) {
        adminService.deleteActivity(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/rewards")
    public ResponseEntity<Reward> createReward(@Valid @RequestBody Reward reward) {
        return ResponseEntity.ok(adminService.createReward(reward));
    }

    @DeleteMapping("/rewards/{id}")
    public ResponseEntity<Void> deleteReward(@PathVariable Long id) {
        adminService.deleteReward(id);
        return ResponseEntity.noContent().build();
    }
}
