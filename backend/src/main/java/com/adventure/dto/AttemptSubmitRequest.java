package com.adventure.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.util.Map;

@Data
public class AttemptSubmitRequest {
    @NotNull
    private Long activityId;

    /**
     * Map of Question ID to Child's Answer String (e.g. {1: "5", 2: "MOVE_UP"})
     */
    @NotNull
    private Map<Long, String> answers;

    private Integer timeSpentSeconds = 30;
}
