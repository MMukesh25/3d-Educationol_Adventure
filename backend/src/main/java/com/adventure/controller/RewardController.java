package com.adventure.controller;

import com.adventure.dto.BuyRewardRequest;
import com.adventure.entity.ChildReward;
import com.adventure.entity.Reward;
import com.adventure.service.RewardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rewards")
@RequiredArgsConstructor
public class RewardController {

    private final RewardService rewardService;

    @GetMapping("/shop")
    public ResponseEntity<List<Reward>> getAllShopItems() {
        return ResponseEntity.ok(rewardService.getAllRewards());
    }

    @GetMapping("/shop/category/{category}")
    public ResponseEntity<List<Reward>> getShopItemsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(rewardService.getRewardsByCategory(category));
    }

    @PostMapping("/purchase")
    public ResponseEntity<ChildReward> purchaseReward(
            Authentication authentication,
            @Valid @RequestBody BuyRewardRequest request
    ) {
        String username = authentication.getName();
        ChildReward childReward = rewardService.purchaseReward(username, request);
        return ResponseEntity.ok(childReward);
    }

    @PostMapping("/equip/{childRewardId}")
    public ResponseEntity<ChildReward> toggleEquip(
            Authentication authentication,
            @PathVariable Long childRewardId
    ) {
        String username = authentication.getName();
        ChildReward childReward = rewardService.toggleEquipReward(username, childRewardId);
        return ResponseEntity.ok(childReward);
    }
}
