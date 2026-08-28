package com.adventure.service;

import com.adventure.entity.Activity;
import com.adventure.entity.Question;
import com.adventure.entity.Subject;
import com.adventure.entity.World;
import com.adventure.exception.ResourceNotFoundException;
import com.adventure.repository.ActivityRepository;
import com.adventure.repository.SubjectRepository;
import com.adventure.repository.WorldRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final WorldRepository worldRepository;
    private final SubjectRepository subjectRepository;

    @Transactional(readOnly = true)
    public List<World> getAllWorlds() {
        return worldRepository.findAllByOrderByOrderIndexAsc();
    }

    @Transactional(readOnly = true)
    public World getWorldByCode(String code) {
        return worldRepository.findByCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("World not found with code: " + code));
    }

    @Transactional(readOnly = true)
    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Activity> getActivitiesByWorldCode(String worldCode) {
        return activityRepository.findByWorldCode(worldCode);
    }

    @Transactional(readOnly = true)
    public List<Activity> getActivitiesBySubjectId(Long subjectId) {
        return activityRepository.findBySubjectId(subjectId);
    }

    @Transactional(readOnly = true)
    public Activity getActivityById(Long id) {
        return activityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Activity not found with id: " + id));
    }
}
