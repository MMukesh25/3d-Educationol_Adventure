package com.adventure.repository;

import com.adventure.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findBySubjectId(Long subjectId);
    List<Activity> findByWorldId(Long worldId);
    List<Activity> findByWorldCode(String worldCode);
    List<Activity> findByDifficulty(Integer difficulty);
}
