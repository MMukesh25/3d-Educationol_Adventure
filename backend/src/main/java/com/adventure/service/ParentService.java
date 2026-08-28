package com.adventure.service;

import com.adventure.dto.ParentReportDto;
import com.adventure.entity.*;
import com.adventure.exception.ResourceNotFoundException;
import com.adventure.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParentService {

    private final UserRepository userRepository;
    private final ParentProfileRepository parentProfileRepository;
    private final ChildProfileRepository childProfileRepository;
    private final AttemptRepository attemptRepository;
    private final SubjectRepository subjectRepository;

    @Transactional(readOnly = true)
    public ParentReportDto getParentReport(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Parent user not found: " + username));

        ParentProfile parent = parentProfileRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    // Fallback to searching all children if role is parent/admin
                    return ParentProfile.builder()
                            .user(user)
                            .fullName(user.getUsername())
                            .build();
                });

        List<ChildProfile> children = childProfileRepository.findByParentId(parent.getId());
        if (children.isEmpty()) {
            // Include all children in system if no direct link (for demo parent simplicity)
            children = childProfileRepository.findAll();
        }

        List<Subject> allSubjects = subjectRepository.findAll();

        List<ParentReportDto.ChildSummary> childSummaries = children.stream().map(child -> {
            List<Attempt> attempts = attemptRepository.findByChildIdOrderByCreatedAtDesc(child.getId());
            Long completedCount = attemptRepository.countCompletedByChildId(child.getId());

            int totalStudyTimeMinutes = attempts.stream()
                    .mapToInt(a -> a.getTimeSpentSeconds() != null ? a.getTimeSpentSeconds() : 30)
                    .sum() / 60;

            Map<String, Integer> subjectMastery = new HashMap<>();
            for (Subject sub : allSubjects) {
                long subAttempts = attempts.stream()
                        .filter(a -> a.getActivity().getSubject().getId().equals(sub.getId()))
                        .count();
                int scoreSum = attempts.stream()
                        .filter(a -> a.getActivity().getSubject().getId().equals(sub.getId()))
                        .mapToInt(Attempt::getScore)
                        .sum();
                int masteryPercent = subAttempts > 0 ? (int) (scoreSum / subAttempts) : 0;
                subjectMastery.put(sub.getCode(), masteryPercent);
            }

            List<ParentReportDto.RecentActivityDto> recentActivities = attempts.stream()
                    .limit(6)
                    .map(a -> ParentReportDto.RecentActivityDto.builder()
                            .activityTitle(a.getActivity().getTitle())
                            .subjectName(a.getActivity().getSubject().getName())
                            .score(a.getScore())
                            .coinsEarned(a.getCoinsEarned())
                            .completedAt(a.getCreatedAt().toString())
                            .build())
                    .collect(Collectors.toList());

            return ParentReportDto.ChildSummary.builder()
                    .childId(child.getId())
                    .displayName(child.getDisplayName())
                    .level(child.getCurrentLevel())
                    .totalCoins(child.getCoins())
                    .totalStars(child.getStars())
                    .streakDays(child.getStreakDays())
                    .totalActivitiesCompleted(completedCount)
                    .totalStudyTimeMinutes(Math.max(1, totalStudyTimeMinutes))
                    .subjectMasteryPercentage(subjectMastery)
                    .recentActivities(recentActivities)
                    .build();
        }).collect(Collectors.toList());

        return ParentReportDto.builder()
                .parentId(parent.getId())
                .parentName(parent.getFullName() != null ? parent.getFullName() : user.getUsername())
                .children(childSummaries)
                .build();
    }
}
