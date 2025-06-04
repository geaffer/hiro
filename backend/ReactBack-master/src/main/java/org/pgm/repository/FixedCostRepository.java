package org.pgm.repository;

import java.time.LocalDate;
import java.util.List;

import org.pgm.entity.FixedCost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FixedCostRepository extends JpaRepository<FixedCost, Long> {
     List<FixedCost> findByDateBetween(LocalDate startDate, LocalDate endDate);
}
