package com.adventure.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChildProfileDto {
    private Long id;
    private String username;
    private String displayName;
    private Integer coins;
    private Integer stars;
    private Integer currentLevel;
    private Integer experiencePoints;
    private Integer streakDays;
    private String avatarData;
    private Long completedActivitiesCount;
    private List<UnlockedRewardDto> unlockedRewards;
    private List<UnlockedAchievementDto> unlockedAchievements;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UnlockedRewardDto {
        private Long id;
        private Long rewardId;
        private String name;
        private String category;
        private String iconEmoji;
        private String assetKey;
        private String colorHex;
        private Boolean isEquipped;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UnlockedAchievementDto {
        private Long id;
        private Long achievementId;
        private String code;
        private String title;
        private String description;
        private String iconEmoji;
        private String unlockedAt;
    }
}
