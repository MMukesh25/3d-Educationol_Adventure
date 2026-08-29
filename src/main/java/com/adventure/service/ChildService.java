package com.adventure.service;

import com.adventure.dto.AvatarUpdateDto;
import com.adventure.dto.ChildProfileDto;
import com.adventure.entity.ChildProfile;
import com.adventure.entity.User;
import com.adventure.exception.ResourceNotFoundException;
import com.adventure.repository.AttemptRepository;
import com.adventure.repository.ChildProfileRepository;
import com.adventure.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChildService {

    private final ChildProfileRepository childProfileRepository;
    private final UserRepository userRepository;
    private final AttemptRepository attemptRepository;

    @Transactional(readOnly = true)
    public ChildProfileDto getProfileByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));

        ChildProfile profile = childProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Child profile not found for user: " + username));

        return mapToDto(profile);
    }

    @Transactional(readOnly = true)
    public ChildProfileDto getProfileById(Long id) {
        ChildProfile profile = childProfileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Child profile not found: " + id));

        return mapToDto(profile);
    }

    @Transactional
    public ChildProfileDto updateAvatar(String username, AvatarUpdateDto updateDto) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));

        ChildProfile profile = childProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Child profile not found for user: " + username));

        profile.setAvatarData(updateDto.getAvatarData());
        childProfileRepository.save(profile);

        return mapToDto(profile);
    }

    public ChildProfileDto mapToDto(ChildProfile profile) {
        Long completedCount = attemptRepository.countCompletedByChildId(profile.getId());

        List<ChildProfileDto.UnlockedRewardDto> rewards = profile.getUnlockedRewards().stream()
                .map(cr -> ChildProfileDto.UnlockedRewardDto.builder()
                        .id(cr.getId())
                        .rewardId(cr.getReward().getId())
                        .name(cr.getReward().getName())
                        .category(cr.getReward().getCategory())
                        .iconEmoji(cr.getReward().getIconEmoji())
                        .assetKey(cr.getReward().getAssetKey())
                        .colorHex(cr.getReward().getColorHex())
                        .isEquipped(cr.getIsEquipped())
                        .build())
                .collect(Collectors.toList());

        List<ChildProfileDto.UnlockedAchievementDto> achievements = profile.getUnlockedAchievements().stream()
                .map(ca -> ChildProfileDto.UnlockedAchievementDto.builder()
                        .id(ca.getId())
                        .achievementId(ca.getAchievement().getId())
                        .code(ca.getAchievement().getCode())
                        .title(ca.getAchievement().getTitle())
                        .description(ca.getAchievement().getDescription())
                        .iconEmoji(ca.getAchievement().getIconEmoji())
                        .unlockedAt(ca.getUnlockedAt().toString())
                        .build())
                .collect(Collectors.toList());

        return ChildProfileDto.builder()
                .id(profile.getId())
                .username(profile.getUser() != null ? profile.getUser().getUsername() : "")
                .displayName(profile.getDisplayName())
                .coins(profile.getCoins())
                .stars(profile.getStars())
                .currentLevel(profile.getCurrentLevel())
                .experiencePoints(profile.getExperiencePoints())
                .streakDays(profile.getStreakDays())
                .avatarData(profile.getAvatarData())
                .completedActivitiesCount(completedCount)
                .unlockedRewards(rewards)
                .unlockedAchievements(achievements)
                .build();
    }
}
