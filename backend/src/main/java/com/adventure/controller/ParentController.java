package com.adventure.controller;

import com.adventure.dto.ParentReportDto;
import com.adventure.service.ParentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/parent")
@RequiredArgsConstructor
public class ParentController {

    private final ParentService parentService;

    @GetMapping("/report")
    @PreAuthorize("hasAnyRole('PARENT', 'ADMIN')")
    public ResponseEntity<ParentReportDto> getParentReport(Authentication authentication) {
        String username = authentication.getName();
        ParentReportDto report = parentService.getParentReport(username);
        return ResponseEntity.ok(report);
    }
}
