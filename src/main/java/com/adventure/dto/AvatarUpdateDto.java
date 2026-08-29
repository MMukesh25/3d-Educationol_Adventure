package com.adventure.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AvatarUpdateDto {
    @NotBlank
    private String avatarData; // JSON representation of 3D avatar selections
}
