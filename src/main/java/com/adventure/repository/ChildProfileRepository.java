package com.adventure.repository;

import com.adventure.entity.ChildProfile;
import com.adventure.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChildProfileRepository extends JpaRepository<ChildProfile, Long> {
    Optional<ChildProfile> findByUser(User user);
    Optional<ChildProfile> findByUserId(Long userId);
    List<ChildProfile> findByParentId(Long parentId);
}
