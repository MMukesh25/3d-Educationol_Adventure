package com.adventure.service;

import com.adventure.dto.AttemptResultResponse;
import com.adventure.dto.AttemptSubmitRequest;
import com.adventure.entity.*;
import com.adventure.exception.ResourceNotFoundException;
import com.adventure.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class GameService {

    private final ActivityRepository activityRepository;
    private final ChildProfileRepository childProfileRepository;
    private final UserRepository userRepository;
    private final AttemptRepository attemptRepository;
    private final CoinService coinService;
    private final AchievementRepository achievementRepository;
    private final ChildAchievementRepository childAchievementRepository;

    @Transactional
    public AttemptResultResponse evaluateAttempt(String username, AttemptSubmitRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));

        ChildProfile child = childProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Child profile not found for user: " + username));

        Activity activity = activityRepository.findById(request.getActivityId())
                .orElseThrow(() -> new ResourceNotFoundException("Activity not found: " + request.getActivityId()));

        List<Question> questions = activity.getQuestions();
        if (questions.isEmpty()) {
            throw new ResourceNotFoundException("No questions configured for this activity");
        }

        int correctCount = 0;
        Map<Long, Boolean> questionResults = new HashMap<>();
        Map<Long, String> submittedAnswers = request.getAnswers() != null ? request.getAnswers() : Collections.emptyMap();

        for (Question q : questions) {
            String submitted = submittedAnswers.get(q.getId());
            boolean isCorrect = false;

            if (submitted != null && !submitted.trim().isEmpty()) {
                String cleanSubmitted = submitted.trim().toLowerCase().replaceAll("\\s+", "");
                String cleanCorrect = q.getCorrectAnswer().trim().toLowerCase().replaceAll("\\s+", "");
                isCorrect = cleanSubmitted.equals(cleanCorrect);
            }

            questionResults.put(q.getId(), isCorrect);
            if (isCorrect) {
                correctCount++;
            }
        }

        int totalQuestions = questions.size();
        int scorePercentage = Math.round(((float) correctCount / totalQuestions) * 100);
        boolean isSuccess = scorePercentage >= 50;

        int coinsEarned = 0;
        int starsEarned = 0;
        int xpEarned = 0;
        boolean leveledUp = false;
        List<String> unlockedAchievementTitles = new ArrayList<>();

        if (isSuccess) {
            coinsEarned = activity.getRewardCoins();
            starsEarned = activity.getRewardStars();
            xpEarned = activity.getRewardXp();

            // Credit coins via secure CoinService
            coinService.addCoins(child, coinsEarned, "ACTIVITY_REWARD", "Completed " + activity.getTitle());

            // Add stars and XP
            child.setStars(child.getStars() + starsEarned);
            child.setExperiencePoints(child.getExperiencePoints() + xpEarned);

            // Level progression check (100 XP per level tier)
            int newLevel = 1 + (child.getExperiencePoints() / 100);
            if (newLevel > child.getCurrentLevel()) {
                child.setCurrentLevel(newLevel);
                leveledUp = true;
            }

            childProfileRepository.save(child);

            // Record Attempt
            Attempt attempt = Attempt.builder()
                    .child(child)
                    .activity(activity)
                    .score(scorePercentage)
                    .isCompleted(true)
                    .coinsEarned(coinsEarned)
                    .starsEarned(starsEarned)
                    .timeSpentSeconds(request.getTimeSpentSeconds() != null ? request.getTimeSpentSeconds() : 30)
                    .build();
            attemptRepository.save(attempt);

            // Check Achievements
            unlockedAchievementTitles = checkAndUnlockAchievements(child, activity);
        }

        String feedback = isSuccess
                ? "🎉 Great Job! You earned " + coinsEarned + " Coins and " + starsEarned + " Stars! ⭐"
                : "😊 Almost there! Try again, you can do it! 💪";

        return AttemptResultResponse.builder()
                .isSuccess(isSuccess)
                .score(scorePercentage)
                .correctCount(correctCount)
                .totalQuestions(totalQuestions)
                .coinsEarned(coinsEarned)
                .starsEarned(starsEarned)
                .xpEarned(xpEarned)
                .totalCoins(child.getCoins())
                .totalStars(child.getStars())
                .currentLevel(child.getCurrentLevel())
                .leveledUp(leveledUp)
                .feedbackMessage(feedback)
                .newlyUnlockedAchievements(unlockedAchievementTitles)
                .questionResults(questionResults)
                .build();
    }

    private List<String> checkAndUnlockAchievements(ChildProfile child, Activity activity) {
        List<String> unlocked = new ArrayList<>();
        Long completedCount = attemptRepository.countCompletedByChildId(child.getId());

        // Check First Adventure
        unlockIfEligible(child, "FIRST_ADVENTURE", completedCount >= 1, unlocked);

        // Check Math Star
        if ("MATH".equalsIgnoreCase(activity.getSubject().getCode())) {
            Long mathCompleted = attemptRepository.countCompletedByChildIdAndSubjectId(child.getId(), activity.getSubject().getId());
            unlockIfEligible(child, "MATH_STAR", mathCompleted >= 2, unlocked);
        }

        // Check Super Detective
        if ("MYSTERY".equalsIgnoreCase(activity.getSubject().getCode())) {
            Long mysteryCompleted = attemptRepository.countCompletedByChildIdAndSubjectId(child.getId(), activity.getSubject().getId());
            unlockIfEligible(child, "SUPER_DETECTIVE", mysteryCompleted >= 2, unlocked);
        }

        // Check Robot Master
        if ("CODING".equalsIgnoreCase(activity.getSubject().getCode())) {
            Long codingCompleted = attemptRepository.countCompletedByChildIdAndSubjectId(child.getId(), activity.getSubject().getId());
            unlockIfEligible(child, "ROBOT_MASTER", codingCompleted >= 2, unlocked);
        }

        // Check Coin Collector
        unlockIfEligible(child, "COIN_COLLECTOR_100", child.getCoins() >= 100, unlocked);

        // Check Streak
        unlockIfEligible(child, "STREAK_5", child.getStreakDays() >= 5, unlocked);

        return unlocked;
    }

    private void unlockIfEligible(ChildProfile child, String code, boolean eligible, List<String> unlockedTitles) {
        if (!eligible) return;

        achievementRepository.findByCode(code).ifPresent(achievement -> {
            boolean alreadyUnlocked = childAchievementRepository.existsByChildIdAndAchievementId(child.getId(), achievement.getId());
            if (!alreadyUnlocked) {
                ChildAchievement ca = ChildAchievement.builder()
                        .child(child)
                        .achievement(achievement)
                        .build();
                childAchievementRepository.save(ca);

                // Give bonus reward
                if (achievement.getCoinBonus() > 0) {
                    coinService.addCoins(child, achievement.getCoinBonus(), "ACHIEVEMENT_BONUS", "Unlocked Achievement: " + achievement.getTitle());
                }
                if (achievement.getStarBonus() > 0) {
                    child.setStars(child.getStars() + achievement.getStarBonus());
                    childProfileRepository.save(child);
                }

                unlockedTitles.add(achievement.getTitle() + " (" + achievement.getIconEmoji() + ")");
            }
        });
    }
}
