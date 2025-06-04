package org.pgm.controller;

import lombok.RequiredArgsConstructor;
import org.pgm.dto.IngredientPurchaseDto;
import org.pgm.service.IngredientPurchaseService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/ingredients")
@RequiredArgsConstructor
public class IngredientPurchaseController {

    private final IngredientPurchaseService ingredientPurchaseService;

    // 전체 데이터 (storeId 미사용 중)
    @GetMapping("/{storeId}")
    public List<IngredientPurchaseDto> getByStore(@PathVariable("storeId") Long storeId) {
        return ingredientPurchaseService.getAll();
    }

    @PostMapping
    public IngredientPurchaseDto create(@RequestBody IngredientPurchaseDto dto) {
        return ingredientPurchaseService.create(dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        ingredientPurchaseService.delete(id);
    }

    @GetMapping("/month")
    public List<IngredientPurchaseDto> getMonthlyIngredients(
            @RequestParam int year,
            @RequestParam int month) {
        return ingredientPurchaseService.getIngredientPurchasesByMonth(year, month);
    }

    @GetMapping("/week")
    public List<IngredientPurchaseDto> getWeeklyIngredients(
            @RequestParam int year,
            @RequestParam int week) {
        return ingredientPurchaseService.getIngredientPurchasesByWeek(year, week);
    }

    // ✅ 날짜 기반 주간 조회 추가
    @GetMapping("/by-date")
    public List<IngredientPurchaseDto> getByWeekDate(
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ingredientPurchaseService.getIngredientPurchasesByWeekDate(date);
    }
    
}
