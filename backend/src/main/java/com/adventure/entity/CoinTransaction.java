package com.adventure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "coin_transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CoinTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "child_id", nullable = false)
    @JsonIgnore
    private ChildProfile child;

    @Column(nullable = false)
    private Integer amount; // Positive for earnings, negative for purchases

    @Column(name = "transaction_type", nullable = false, length = 30)
    private String transactionType; // ACTIVITY_REWARD, DAILY_CHALLENGE, SHOP_PURCHASE, ACHIEVEMENT_BONUS, STREAK_BONUS

    @Column(nullable = false, length = 255)
    private String description;

    @Column(name = "balance_after", nullable = false)
    private Integer balanceAfter;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
