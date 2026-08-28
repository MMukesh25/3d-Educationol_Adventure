package com.adventure.controller;

import com.adventure.entity.Subject;
import com.adventure.entity.World;
import com.adventure.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/worlds")
@RequiredArgsConstructor
public class WorldController {

    private final ActivityService activityService;

    @GetMapping
    public ResponseEntity<List<World>> getAllWorlds() {
        return ResponseEntity.ok(activityService.getAllWorlds());
    }

    @GetMapping("/{code}")
    public ResponseEntity<World> getWorldByCode(@PathVariable String code) {
        return ResponseEntity.ok(activityService.getWorldByCode(code));
    }

    @GetMapping("/subjects/all")
    public ResponseEntity<List<Subject>> getAllSubjects() {
        return ResponseEntity.ok(activityService.getAllSubjects());
    }
}
