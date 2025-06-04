package org.pgm.repository;

import java.time.LocalDate;
import java.util.List;

import org.pgm.entity.LaborCost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LaborCostRepository extends JpaRepository<LaborCost, Long> {
    List<LaborCost> findByDateBetween(LocalDate startDate, LocalDate endDate);
}

