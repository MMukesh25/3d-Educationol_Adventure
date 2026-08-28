package com.adventure.repository;

import com.adventure.entity.World;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface WorldRepository extends JpaRepository<World, Long> {
    Optional<World> findByCode(String code);
    List<World> findAllByOrderByOrderIndexAsc();
}
