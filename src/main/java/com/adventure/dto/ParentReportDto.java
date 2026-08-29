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
public class ParentReportDto {
    private Long parentId;
    private String parentName;
    private List<ChildSummary> children;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ChildSummary {
        private Long childId;
        private String displayName;
        private Integer level;
        private Integer totalCoins;
        private Integer totalStars;
        private Integer streakDays;
        private Long totalActivitiesCompleted;
        private Integer totalStudyTimeMinutes;
        private Map<String, Integer> subjectMasteryPercentage; // e.g. {"MATH": 85, "CODING": 70, "MYSTERY": 90}
        private List<RecentActivityDto> recentActivities;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RecentActivityDto {
        private String activityTitle;
        private String subjectName;
        private Integer score;
        private Integer coinsEarned;
        private String completedAt;
    }
}
