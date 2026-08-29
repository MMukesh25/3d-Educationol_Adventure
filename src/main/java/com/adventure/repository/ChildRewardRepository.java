package com.adventure.repository;

import com.adventure.entity.ChildReward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChildRewardRepository extends JpaRepository<ChildReward, Long> {
    List<ChildReward> findByChildId(Long childId);
    Optional<ChildReward> findByChildIdAndRewardId(Long childId, Long rewardId);
    Boolean existsByChildIdAndRewardId(Long childId, Long rewardId);
}
