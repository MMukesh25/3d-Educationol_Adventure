package com.adventure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "activities")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "world_id", nullable = false)
    private World world;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String instructions;

    @Column(nullable = false)
    @Builder.Default
    private Integer difficulty = 1; // 1 to 5

    @Column(name = "reward_coins", nullable = false)
    @Builder.Default
    private Integer rewardCoins = 10;

    @Column(name = "reward_stars", nullable = false)
    @Builder.Default
    private Integer rewardStars = 1;

    @Column(name = "reward_xp", nullable = false)
    @Builder.Default
    private Integer rewardXp = 25;

    @Column(name = "icon_emoji", length = 20)
    @Builder.Default
    private String iconEmoji = "⭐";

    @OneToMany(mappedBy = "activity", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Builder.Default
    private List<Question> questions = new ArrayList<>();

    @OneToMany(mappedBy = "activity", cascade = CascadeType.ALL)
    @JsonIgnore
    @Builder.Default
    private List<Attempt> attempts = new ArrayList<>();
}
