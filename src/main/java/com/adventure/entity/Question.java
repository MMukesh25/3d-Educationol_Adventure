package com.adventure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "questions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "activity_id", nullable = false)
    @JsonIgnore
    private Activity activity;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String prompt;

    @Column(name = "question_type", length = 30)
    @Builder.Default
    private String questionType = "CHOICE"; // CHOICE, VISUAL_COUNT, BLOCK_CODE, CLUE_SEARCH, MEMORY_FLIP, PATTERN

    @Column(name = "media_url", length = 255)
    private String mediaUrl;

    @Column(name = "visual_data", columnDefinition = "TEXT")
    private String visualData; // JSON or emoji sequence like "🍎 🍎 🍎 + 🍎 🍎"

    @Column(name = "options_json", columnDefinition = "TEXT")
    private String optionsJson; // JSON array of options: ["3", "4", "5"]

    @Column(name = "correct_answer", nullable = false, length = 255)
    private String correctAnswer;

    @Column(columnDefinition = "TEXT")
    private String hint;

    @Column(columnDefinition = "TEXT")
    private String explanation;
}
