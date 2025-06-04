package org.pgm.controller;

import lombok.RequiredArgsConstructor;
import org.pgm.dto.LaborCostDto;
import org.pgm.service.LaborCostService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/labor-costs")
@RequiredArgsConstructor
public class LaborCostController {

    private final LaborCostService laborCostService;

    @PostMapping
    public LaborCostDto create(@RequestBody LaborCostDto dto) {
        return laborCostService.create(dto);
    }

    @GetMapping
    public List<LaborCostDto> getAll() {
        return laborCostService.getAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        laborCostService.delete(id);
    }

    @GetMapping("/month")
    public List<LaborCostDto> getMonthlyLaborCost(
        @RequestParam int year,
        @RequestParam int month) {
    return laborCostService.getLaborCostsByMonth(year, month);
    }
    @GetMapping("/week")
    public List<LaborCostDto> getWeeklyLaborCosts(
        @RequestParam int year,
        @RequestParam int week) {
    return laborCostService.getLaborCostsByWeek(year, week);
    }   
    @GetMapping("/by-date")
    public List<LaborCostDto> getByWeekDate(
        @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
    return laborCostService.getLaborCostsByWeekDate(date);
}



}
