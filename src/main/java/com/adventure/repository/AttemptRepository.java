package com.adventure.repository;

import com.adventure.entity.Attempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AttemptRepository extends JpaRepository<Attempt, Long> {
    List<Attempt> findByChildIdOrderByCreatedAtDesc(Long childId);
    List<Attempt> findByChildIdAndActivityId(Long childId, Long activityId);
    
    @Query("SELECT COUNT(a) FROM Attempt a WHERE a.child.id = :childId AND a.isCompleted = true")
    Long countCompletedByChildId(Long childId);
    
    @Query("SELECT COUNT(a) FROM Attempt a WHERE a.child.id = :childId AND a.activity.subject.id = :subjectId AND a.isCompleted = true")
    Long countCompletedByChildIdAndSubjectId(Long childId, Long subjectId);
}
