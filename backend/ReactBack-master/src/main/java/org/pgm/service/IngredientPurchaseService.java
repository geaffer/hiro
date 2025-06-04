package org.pgm.service;

import org.pgm.dto.IngredientPurchaseDto;

import java.time.LocalDate;
import java.util.List;

public interface IngredientPurchaseService {
    IngredientPurchaseDto create(IngredientPurchaseDto dto);
    List<IngredientPurchaseDto> getAll();
    void delete(Long id);
    List<IngredientPurchaseDto> getIngredientPurchasesByMonth(int year, int month);
    List<IngredientPurchaseDto> getIngredientPurchasesByWeek(int year, int week);
    List<IngredientPurchaseDto> getIngredientPurchasesByWeekDate(LocalDate date);


}
