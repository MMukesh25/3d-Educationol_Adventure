package com.adventure.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "daily_challenges")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DailyChallenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "icon_emoji", length = 20)
    @Builder.Default
    private String iconEmoji = "🎯";

    @Column(name = "challenge_type", nullable = false, length = 50)
    private String challengeType; // MATH_COUNT, SOLVE_MYSTERY, CODING_PUZZLE, MEMORY_CARDS, ANY_ACTIVITY

    @Column(name = "required_count", nullable = false)
    @Builder.Default
    private Integer requiredCount = 2;

    @Column(name = "reward_coins", nullable = false)
    @Builder.Default
    private Integer rewardCoins = 20;

    @Column(name = "reward_stars", nullable = false)
    @Builder.Default
    private Integer rewardStars = 1;

    @Column(name = "target_date")
    private LocalDate targetDate;
}
