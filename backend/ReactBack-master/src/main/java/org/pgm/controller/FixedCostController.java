package org.pgm.controller;

import lombok.RequiredArgsConstructor;
import org.pgm.dto.FixedCostDto;
import org.pgm.service.FixedCostService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/fixed-costs")
@RequiredArgsConstructor
public class FixedCostController {

    private final FixedCostService fixedCostService;

    @PostMapping
    public FixedCostDto create(@RequestBody FixedCostDto dto) {
        return fixedCostService.create(dto);
    }

    @GetMapping
    public List<FixedCostDto> getAll() {
        return fixedCostService.getAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        fixedCostService.delete(id);
    }
    @GetMapping("/month")
    public List<FixedCostDto> getMonthlyFixedCosts(
        @RequestParam int year,
        @RequestParam int month) {
    return fixedCostService.getFixedCostsByMonth(year, month);
    }
    @GetMapping("/week")
    public List<FixedCostDto> getWeeklyFixedCosts(
        @RequestParam int year,
        @RequestParam int week) {
    return fixedCostService.getFixedCostsByWeek(year, week);
    }
    @GetMapping("/by-date")
    public List<FixedCostDto> getByWeekDate(
    @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
    return fixedCostService.getFixedCostsByWeekDate(date);
    }
    



}
