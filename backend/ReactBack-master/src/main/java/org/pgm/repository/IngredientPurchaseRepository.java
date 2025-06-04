package org.pgm.repository;

import java.time.LocalDate;
import java.util.List;

import org.pgm.entity.IngredientPurchase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientPurchaseRepository extends JpaRepository<IngredientPurchase, Long> {
    List<IngredientPurchase> findByDateBetween(LocalDate startDate, LocalDate endDate);
    
}
