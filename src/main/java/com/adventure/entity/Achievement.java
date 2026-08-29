package com.adventure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "achievements")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Achievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 50)
    private String code; // FIRST_ADVENTURE, MATH_STAR, SUPER_DETECTIVE, ROBOT_MASTER, BRAIN_EXPLORER, STREAK_5, COIN_COLLECTOR_100, PUZZLE_MASTER

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "icon_emoji", length = 20)
    @Builder.Default
    private String iconEmoji = "🏆";

    @Column(name = "coin_bonus", nullable = false)
    @Builder.Default
    private Integer coinBonus = 25;

    @Column(name = "star_bonus", nullable = false)
    @Builder.Default
    private Integer starBonus = 2;

    @Column(name = "criteria_type", nullable = false, length = 50)
    private String criteriaType; // ACTIVITIES_COMPLETED, COINS_EARNED, SUBJECT_COMPLETED, STREAK_DAYS

    @Column(name = "criteria_target", nullable = false)
    private Integer criteriaTarget;

    @OneToMany(mappedBy = "achievement", cascade = CascadeType.ALL)
    @JsonIgnore
    @Builder.Default
    private List<ChildAchievement> childAchievements = new ArrayList<>();
}
