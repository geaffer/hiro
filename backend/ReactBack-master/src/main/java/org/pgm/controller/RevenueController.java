package org.pgm.controller;

import lombok.RequiredArgsConstructor;
import org.pgm.dto.RevenueDto;
import org.pgm.service.RevenueService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@RestController
@RequestMapping("/api/revenues")
@RequiredArgsConstructor
public class RevenueController {

    private final RevenueService revenueService;

    @PostMapping
    public RevenueDto create(@RequestBody RevenueDto dto) {
        return revenueService.create(dto);
    }

    @GetMapping
    public List<RevenueDto> getAll() {
        return revenueService.getAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        revenueService.delete(id);
    }

    @GetMapping("/month")
    public List<RevenueDto> getByMonth(@RequestParam int year, @RequestParam int month) {
        return revenueService.getByMonth(YearMonth.of(year, month));
    }

    @GetMapping("/highest")
    public RevenueDto getHighest() {
        return revenueService.getHighestRevenue();
    }

    @GetMapping("/lowest")
    public RevenueDto getLowest() {
        return revenueService.getLowestRevenue();
    }

    // 🔧 여기만 수정
    @RequestMapping(value = "/week", method = RequestMethod.GET)
    public List<RevenueDto> getByWeek(@RequestParam int year, @RequestParam int week) {
        return revenueService.getByWeek(year, week);
    }
    @GetMapping("/by-date")
    public List<RevenueDto> getByWeekDate(
        @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
    return revenueService.getByWeekDate(date);
    }

}
