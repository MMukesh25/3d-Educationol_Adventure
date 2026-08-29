package com.adventure.controller;

import com.adventure.entity.Achievement;
import com.adventure.entity.DailyChallenge;
import com.adventure.service.AchievementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/achievements")
@RequiredArgsConstructor
public class AchievementController {

    private final AchievementService achievementService;

    @GetMapping
    public ResponseEntity<List<Achievement>> getAllAchievements() {
        return ResponseEntity.ok(achievementService.getAllAchievements());
    }

    @GetMapping("/daily-challenges")
    public ResponseEntity<List<DailyChallenge>> getDailyChallenges() {
        return ResponseEntity.ok(achievementService.getTodayDailyChallenges());
    }
}
