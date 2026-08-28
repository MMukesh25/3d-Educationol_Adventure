package com.adventure.repository;

import com.adventure.entity.ParentProfile;
import com.adventure.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ParentProfileRepository extends JpaRepository<ParentProfile, Long> {
    Optional<ParentProfile> findByUser(User user);
    Optional<ParentProfile> findByUserId(Long userId);
}
