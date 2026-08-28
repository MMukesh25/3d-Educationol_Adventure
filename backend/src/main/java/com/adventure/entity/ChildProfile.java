package com.adventure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "child_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChildProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    @JsonIgnore
    private ParentProfile parent;

    @Column(name = "display_name", nullable = false, length = 50)
    private String displayName;

    @Column(name = "avatar_data", columnDefinition = "TEXT")
    @Builder.Default
    private String avatarData = "{\"skinColor\":\"#ffcc80\",\"hairStyle\":\"short\",\"hairColor\":\"#5d4037\",\"outfitColor\":\"#42a5f5\",\"hat\":\"none\",\"accessory\":\"none\",\"pet\":\"puppy\"}";

    @Column(nullable = false)
    @Builder.Default
    private Integer coins = 50;

    @Column(nullable = false)
    @Builder.Default
    private Integer stars = 5;

    @Column(name = "current_level", nullable = false)
    @Builder.Default
    private Integer currentLevel = 1;

    @Column(name = "experience_points", nullable = false)
    @Builder.Default
    private Integer experiencePoints = 0;

    @Column(name = "streak_days", nullable = false)
    @Builder.Default
    private Integer streakDays = 1;

    @Column(name = "last_active_date")
    private LocalDate lastActiveDate;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "child", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    @Builder.Default
    private List<ChildReward> unlockedRewards = new ArrayList<>();

    @OneToMany(mappedBy = "child", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    @Builder.Default
    private List<ChildAchievement> unlockedAchievements = new ArrayList<>();

    @OneToMany(mappedBy = "child", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    @Builder.Default
    private List<Attempt> attempts = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.lastActiveDate == null) {
            this.lastActiveDate = LocalDate.now();
        }
    }
}
