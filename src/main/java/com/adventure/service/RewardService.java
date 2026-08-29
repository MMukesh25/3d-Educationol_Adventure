package com.adventure.service;

import com.adventure.dto.BuyRewardRequest;
import com.adventure.entity.ChildProfile;
import com.adventure.entity.ChildReward;
import com.adventure.entity.Reward;
import com.adventure.entity.User;
import com.adventure.exception.BadRequestException;
import com.adventure.exception.ResourceNotFoundException;
import com.adventure.repository.ChildProfileRepository;
import com.adventure.repository.ChildRewardRepository;
import com.adventure.repository.RewardRepository;
import com.adventure.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RewardService {

    private final RewardRepository rewardRepository;
    private final ChildRewardRepository childRewardRepository;
    private final ChildProfileRepository childProfileRepository;
    private final UserRepository userRepository;
    private final CoinService coinService;

    @Transactional(readOnly = true)
    public List<Reward> getAllRewards() {
        return rewardRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Reward> getRewardsByCategory(String category) {
        return rewardRepository.findByCategory(category);
    }

    @Transactional
    public ChildReward purchaseReward(String username, BuyRewardRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));

        ChildProfile child = childProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Child profile not found for user: " + username));

        Reward reward = rewardRepository.findById(request.getRewardId())
                .orElseThrow(() -> new ResourceNotFoundException("Reward not found with id: " + request.getRewardId()));

        if (childRewardRepository.existsByChildIdAndRewardId(child.getId(), reward.getId())) {
            throw new BadRequestException("You already unlocked this item!");
        }

        // Deduct coins using CoinService
        coinService.deductCoins(child, reward.getCoinCost(), "SHOP_PURCHASE", "Unlocked: " + reward.getName());

        ChildReward childReward = ChildReward.builder()
                .child(child)
                .reward(reward)
                .isEquipped(true)
                .build();

        return childRewardRepository.save(childReward);
    }

    @Transactional
    public ChildReward toggleEquipReward(String username, Long childRewardId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));

        ChildProfile child = childProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Child profile not found for user: " + username));

        ChildReward childReward = childRewardRepository.findById(childRewardId)
                .orElseThrow(() -> new ResourceNotFoundException("Unlocked reward not found: " + childRewardId));

        if (!childReward.getChild().getId().equals(child.getId())) {
            throw new BadRequestException("This item does not belong to your character");
        }

        // Unequip items in same category if equipping this one
        if (!childReward.getIsEquipped()) {
            List<ChildReward> currentRewards = childRewardRepository.findByChildId(child.getId());
            for (ChildReward cr : currentRewards) {
                if (cr.getReward().getCategory().equalsIgnoreCase(childReward.getReward().getCategory())) {
                    cr.setIsEquipped(false);
                    childRewardRepository.save(cr);
                }
            }
        }

        childReward.setIsEquipped(!childReward.getIsEquipped());
        return childRewardRepository.save(childReward);
    }
}
