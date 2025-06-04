package org.pgm.service;

import org.pgm.dto.FixedCostDto;

import java.time.LocalDate;
import java.util.List;

public interface FixedCostService {
    FixedCostDto create(FixedCostDto dto);
    List<FixedCostDto> getAll();
    void delete(Long id);
    List<FixedCostDto> getFixedCostsByMonth(int year, int month);
    List<FixedCostDto> getFixedCostsByWeek(int year, int week);
    List<FixedCostDto> getFixedCostsByWeekDate(LocalDate date);



}
