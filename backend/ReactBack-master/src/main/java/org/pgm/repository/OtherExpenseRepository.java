package org.pgm.repository;

import org.pgm.entity.OtherExpense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface OtherExpenseRepository extends JpaRepository<OtherExpense, Long> {
    List<OtherExpense> findByDateBetween(LocalDate start, LocalDate end);
}
