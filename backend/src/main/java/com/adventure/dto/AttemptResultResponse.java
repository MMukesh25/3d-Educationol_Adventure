package com.adventure.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttemptResultResponse {
    private Boolean isSuccess;
    private Integer score; // 0 to 100
    private Integer correctCount;
    private Integer totalQuestions;
    private Integer coinsEarned;
    private Integer starsEarned;
    private Integer xpEarned;
    private Integer totalCoins;
    private Integer totalStars;
    private Integer currentLevel;
    private Boolean leveledUp;
    private String feedbackMessage;
    private List<String> newlyUnlockedAchievements;
    private Map<Long, Boolean> questionResults;
}
