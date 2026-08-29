package com.adventure.service;

import com.adventure.dto.AdminStatsDto;
import com.adventure.entity.*;
import com.adventure.exception.ResourceNotFoundException;
import com.adventure.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final ChildProfileRepository childProfileRepository;
    private final ParentProfileRepository parentProfileRepository;
    private final ActivityRepository activityRepository;
    private final QuestionRepository questionRepository;
    private final AttemptRepository attemptRepository;
    private final ChildAchievementRepository childAchievementRepository;
    private final RewardRepository rewardRepository;
    private final SubjectRepository subjectRepository;
    private final WorldRepository worldRepository;

    @Transactional(readOnly = true)
    public AdminStatsDto getPlatformStats() {
        long totalUsers = userRepository.count();
        long totalChildren = childProfileRepository.count();
        long totalParents = parentProfileRepository.count();
        long totalActivities = activityRepository.count();
        long totalQuestions = questionRepository.count();
        long totalAttempts = attemptRepository.count();
        long totalAchievements = childAchievementRepository.count();

        long circulatingCoins = childProfileRepository.findAll().stream()
                .mapToLong(ChildProfile::getCoins)
                .sum();

        return AdminStatsDto.builder()
                .totalUsers(totalUsers)
                .totalChildren(totalChildren)
                .totalParents(totalParents)
                .totalActivities(totalActivities)
                .totalQuestions(totalQuestions)
                .totalAttempts(totalAttempts)
                .totalCoinsCirculating(circulatingCoins)
                .totalAchievementsUnlocked(totalAchievements)
                .build();
    }

    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    @Transactional
    public Activity createActivity(Activity activity) {
        return activityRepository.save(activity);
    }

    @Transactional
    public void deleteActivity(Long id) {
        if (!activityRepository.existsById(id)) {
            throw new ResourceNotFoundException("Activity not found: " + id);
        }
        activityRepository.deleteById(id);
    }

    @Transactional
    public Reward createReward(Reward reward) {
        return rewardRepository.save(reward);
    }

    @Transactional
    public void deleteReward(Long id) {
        if (!rewardRepository.existsById(id)) {
            throw new ResourceNotFoundException("Reward not found: " + id);
        }
        rewardRepository.deleteById(id);
    }
}
