package com.adventure.service;

import com.adventure.entity.Achievement;
import com.adventure.entity.DailyChallenge;
import com.adventure.repository.AchievementRepository;
import com.adventure.repository.DailyChallengeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AchievementService {

    private final AchievementRepository achievementRepository;
    private final DailyChallengeRepository dailyChallengeRepository;

    @Transactional(readOnly = true)
    public List<Achievement> getAllAchievements() {
        return achievementRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<DailyChallenge> getTodayDailyChallenges() {
        LocalDate today = LocalDate.now();
        List<DailyChallenge> challenges = dailyChallengeRepository.findByTargetDate(today);
        if (challenges.isEmpty()) {
            return dailyChallengeRepository.findAll();
        }
        return challenges;
    }
}
