package com.adventure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "subjects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 50)
    private String code; // MATH, MYSTERY, CODING, BRAIN, PUZZLE, CREATIVE

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 20)
    private String icon;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "color_theme", length = 30)
    private String colorTheme;

    @OneToMany(mappedBy = "subject", cascade = CascadeType.ALL)
    @JsonIgnore
    @Builder.Default
    private List<Activity> activities = new ArrayList<>();
}
