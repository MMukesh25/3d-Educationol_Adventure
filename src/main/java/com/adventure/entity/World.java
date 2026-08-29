package com.adventure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "worlds")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class World {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 50)
    private String code; // HOME, MATH_ISLAND, MYSTERY_HOUSE, CODING_LAB, BRAIN_FOREST, PUZZLE_CASTLE, CREATIVITY_ZONE

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 20)
    private String icon;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "background_sky", length = 50)
    private String backgroundSky;

    @Column(name = "portal_color", length = 30)
    private String portalColor;

    @Column(name = "order_index")
    private Integer orderIndex;

    @Column(name = "unlocked_by_default")
    @Builder.Default
    private Boolean unlockedByDefault = true;

    @OneToMany(mappedBy = "world", cascade = CascadeType.ALL)
    @JsonIgnore
    @Builder.Default
    private List<Activity> activities = new ArrayList<>();
}
