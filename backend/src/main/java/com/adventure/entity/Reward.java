package com.adventure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "rewards")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reward {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 30)
    private String category; // HATS, CLOTHES, PETS, GLASSES, ROOM_DECO, VEHICLES

    @Column(name = "coin_cost", nullable = false)
    private Integer coinCost;

    @Column(name = "icon_emoji", length = 20)
    private String iconEmoji;

    @Column(name = "asset_key", length = 100)
    private String assetKey; // e.g. "wizard_hat", "superhero_cape", "dragon_pet"

    @Column(name = "color_hex", length = 20)
    private String colorHex;

    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "reward", cascade = CascadeType.ALL)
    @JsonIgnore
    @Builder.Default
    private List<ChildReward> childRewards = new ArrayList<>();
}
