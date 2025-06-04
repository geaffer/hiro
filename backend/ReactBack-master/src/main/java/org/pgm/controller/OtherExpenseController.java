package org.pgm.controller;

import lombok.RequiredArgsConstructor;
import org.pgm.dto.OtherExpenseDto;
import org.pgm.service.OtherExpenseService;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;
import java.util.List;

@RestController
@RequestMapping("/api/other-expenses")
@RequiredArgsConstructor
public class OtherExpenseController {

    private final OtherExpenseService service;

    @PostMapping
    public OtherExpenseDto create(@RequestBody OtherExpenseDto dto) {
        return service.create(dto);
    }

    @GetMapping
    public List<OtherExpenseDto> getAll() {
        return service.getAll();
    }

    @GetMapping("/month")
    public List<OtherExpenseDto> getByMonth(@RequestParam int year, @RequestParam int month) {
        return service.getByMonth(YearMonth.of(year, month));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
