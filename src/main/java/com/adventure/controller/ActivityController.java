package com.adventure.controller;

import com.adventure.entity.Activity;
import com.adventure.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;

    @GetMapping("/world/{worldCode}")
    public ResponseEntity<List<Activity>> getActivitiesByWorld(@PathVariable String worldCode) {
        return ResponseEntity.ok(activityService.getActivitiesByWorldCode(worldCode));
    }

    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<List<Activity>> getActivitiesBySubject(@PathVariable Long subjectId) {
        return ResponseEntity.ok(activityService.getActivitiesBySubjectId(subjectId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Activity> getActivityById(@PathVariable Long id) {
        return ResponseEntity.ok(activityService.getActivityById(id));
    }
}
