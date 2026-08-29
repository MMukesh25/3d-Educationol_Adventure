package com.adventure.service;

import com.adventure.entity.ChildProfile;
import com.adventure.entity.CoinTransaction;
import com.adventure.exception.BadRequestException;
import com.adventure.repository.ChildProfileRepository;
import com.adventure.repository.CoinTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CoinService {

    private final ChildProfileRepository childProfileRepository;
    private final CoinTransactionRepository coinTransactionRepository;

    @Transactional
    public ChildProfile addCoins(ChildProfile child, int amount, String transactionType, String description) {
        if (amount <= 0) {
            throw new BadRequestException("Coin increment amount must be positive");
        }

        int newBalance = child.getCoins() + amount;
        child.setCoins(newBalance);
        childProfileRepository.save(child);

        CoinTransaction tx = CoinTransaction.builder()
                .child(child)
                .amount(amount)
                .transactionType(transactionType)
                .description(description)
                .balanceAfter(newBalance)
                .build();
        coinTransactionRepository.save(tx);

        return child;
    }

    @Transactional
    public ChildProfile deductCoins(ChildProfile child, int amount, String transactionType, String description) {
        if (amount <= 0) {
            throw new BadRequestException("Coin deduction amount must be positive");
        }
        if (child.getCoins() < amount) {
            throw new BadRequestException("Not enough coins! You have " + child.getCoins() + " coins, but need " + amount + ".");
        }

        int newBalance = child.getCoins() - amount;
        child.setCoins(newBalance);
        childProfileRepository.save(child);

        CoinTransaction tx = CoinTransaction.builder()
                .child(child)
                .amount(-amount)
                .transactionType(transactionType)
                .description(description)
                .balanceAfter(newBalance)
                .build();
        coinTransactionRepository.save(tx);

        return child;
    }
}
