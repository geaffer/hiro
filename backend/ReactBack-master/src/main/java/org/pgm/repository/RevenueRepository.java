package org.pgm.repository;

import org.pgm.entity.Revenue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface RevenueRepository extends JpaRepository<Revenue, Long> {
    List<Revenue> findByDateBetween(LocalDate start, LocalDate end);
    
}
