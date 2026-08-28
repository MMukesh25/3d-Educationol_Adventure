package com.adventure.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BuyRewardRequest {
    @NotNull
    private Long rewardId;
}
