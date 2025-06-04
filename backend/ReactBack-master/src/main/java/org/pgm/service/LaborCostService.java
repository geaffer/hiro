// LaborCostService.java
package org.pgm.service;

import org.pgm.dto.LaborCostDto;

import java.time.LocalDate;
import java.util.List;

public interface LaborCostService {
    LaborCostDto create(LaborCostDto dto);
    List<LaborCostDto> getAll();
    void delete(Long id);
    List<LaborCostDto> getLaborCostsByMonth(int year, int month);
    List<LaborCostDto> getLaborCostsByWeek(int year, int week);
    // LaborCostService.java (추가)
    List<LaborCostDto> getLaborCostsByWeek(LocalDate anyDateInWeek);
    List<LaborCostDto> getLaborCostsByWeekDate(LocalDate date);




    
}
