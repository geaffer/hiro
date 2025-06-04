package org.pgm.service;

import org.pgm.dto.RevenueDto;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

public interface RevenueService {
    RevenueDto create(RevenueDto dto);
    List<RevenueDto> getAll();
    void delete(Long id);
    List<RevenueDto> getByMonth(YearMonth ym);
    RevenueDto getHighestRevenue();
    RevenueDto getLowestRevenue();
    List<RevenueDto> getByWeek(int year, int week);
    List<RevenueDto> getByWeekDate(LocalDate date);



}
