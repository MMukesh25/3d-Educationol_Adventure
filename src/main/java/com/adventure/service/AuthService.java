package com.adventure.service;

import com.adventure.dto.AuthRequest;
import com.adventure.dto.JwtResponse;
import com.adventure.dto.SignupRequest;
import com.adventure.entity.*;
import com.adventure.exception.BadRequestException;
import com.adventure.exception.ResourceNotFoundException;
import com.adventure.repository.ChildProfileRepository;
import com.adventure.repository.ParentProfileRepository;
import com.adventure.repository.UserRepository;
import com.adventure.security.JwtUtils;
import com.adventure.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final ChildProfileRepository childProfileRepository;
    private final ParentProfileRepository parentProfileRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;

    @Transactional
    public JwtResponse authenticateUser(AuthRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        JwtResponse.JwtResponseBuilder responseBuilder = JwtResponse.builder()
                .token(jwt)
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole().name());

        if (user.getRole() == Role.ROLE_CHILD) {
            ChildProfile profile = childProfileRepository.findByUserId(user.getId())
                    .orElseGet(() -> {
                        ChildProfile newProfile = ChildProfile.builder()
                                .user(user)
                                .displayName(user.getUsername())
                                .coins(100)
                                .stars(10)
                                .currentLevel(1)
                                .streakDays(1)
                                .lastActiveDate(LocalDate.now())
                                .build();
                        return childProfileRepository.save(newProfile);
                    });

            // Calculate streak logic on login
            updateStreak(profile);

            responseBuilder.childProfileId(profile.getId())
                    .displayName(profile.getDisplayName())
                    .coins(profile.getCoins())
                    .stars(profile.getStars())
                    .currentLevel(profile.getCurrentLevel())
                    .streakDays(profile.getStreakDays())
                    .avatarData(profile.getAvatarData());
        }

        return responseBuilder.build();
    }

    private void updateStreak(ChildProfile profile) {
        LocalDate today = LocalDate.now();
        if (profile.getLastActiveDate() == null) {
            profile.setLastActiveDate(today);
            profile.setStreakDays(1);
        } else {
            long daysBetween = ChronoUnit.DAYS.between(profile.getLastActiveDate(), today);
            if (daysBetween == 1) {
                profile.setStreakDays(profile.getStreakDays() + 1);
                profile.setLastActiveDate(today);
            } else if (daysBetween > 1) {
                profile.setStreakDays(1);
                profile.setLastActiveDate(today);
            }
        }
        childProfileRepository.save(profile);
    }

    @Transactional
    public JwtResponse registerUser(SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            throw new BadRequestException("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new BadRequestException("Error: Email is already in use!");
        }

        Role role = signUpRequest.getRole() != null ? signUpRequest.getRole() : Role.ROLE_CHILD;

        User user = User.builder()
                .username(signUpRequest.getUsername())
                .email(signUpRequest.getEmail())
                .password(encoder.encode(signUpRequest.getPassword()))
                .role(role)
                .build();

        userRepository.save(user);

        if (role == Role.ROLE_CHILD) {
            String name = signUpRequest.getDisplayName() != null && !signUpRequest.getDisplayName().isBlank()
                    ? signUpRequest.getDisplayName() : signUpRequest.getUsername();

            ParentProfile parent = null;
            if (signUpRequest.getParentUsername() != null && !signUpRequest.getParentUsername().isBlank()) {
                parent = userRepository.findByUsername(signUpRequest.getParentUsername())
                        .map(User::getParentProfile)
                        .orElse(null);
            }

            ChildProfile profile = ChildProfile.builder()
                    .user(user)
                    .parent(parent)
                    .displayName(name)
                    .coins(100)
                    .stars(10)
                    .currentLevel(1)
                    .streakDays(1)
                    .lastActiveDate(LocalDate.now())
                    .build();
            childProfileRepository.save(profile);
        } else if (role == Role.ROLE_PARENT) {
            ParentProfile parentProfile = ParentProfile.builder()
                    .user(user)
                    .fullName(signUpRequest.getUsername())
                    .build();
            parentProfileRepository.save(parentProfile);
        }

        // Auto authenticate after registration
        return authenticateUser(new AuthRequest() {{
            setUsername(signUpRequest.getUsername());
            setPassword(signUpRequest.getPassword());
        }});
    }
}
