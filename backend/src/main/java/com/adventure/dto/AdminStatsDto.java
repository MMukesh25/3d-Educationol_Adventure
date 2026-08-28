package com.adventure.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminStatsDto {
    private Long totalUsers;
    private Long totalChildren;
    private Long totalParents;
    private Long totalActivities;
    private Long totalQuestions;
    private Long totalAttempts;
    private Long totalCoinsCirculating;
    private Long totalAchievementsUnlocked;
}
