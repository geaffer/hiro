package org.pgm.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.pgm.dto.IngredientPurchaseDto;
import org.pgm.entity.IngredientPurchase;
import org.pgm.repository.IngredientPurchaseRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.IsoFields;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IngredientPurchaseServiceImpl implements IngredientPurchaseService {

    private final IngredientPurchaseRepository ingredientRepo;
    private final ModelMapper modelMapper = new ModelMapper();

    @Override
    public IngredientPurchaseDto create(IngredientPurchaseDto dto) {
        IngredientPurchase purchase = new IngredientPurchase();
        purchase.setDate(dto.getDate());
        purchase.setItemName(dto.getItemName());
        purchase.setQuantity(dto.getQuantity());
        purchase.setUnitPrice(dto.getUnitPrice());
        purchase.setTotalPrice(dto.getTotalPrice());

        IngredientPurchase saved = ingredientRepo.save(purchase);
        dto.setId(saved.getId());
        return dto;
    }

    @Override
    public List<IngredientPurchaseDto> getAll() {
        return ingredientRepo.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        ingredientRepo.deleteById(id);
    }

    @Override
    public List<IngredientPurchaseDto> getIngredientPurchasesByMonth(int year, int month) {
        try {
            System.out.println("🟢 [Ingredient] 월별 조회: year=" + year + ", month=" + month);
            LocalDate startDate = LocalDate.of(year, month, 1);
            LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

            return ingredientRepo.findByDateBetween(startDate, endDate).stream()
                    .map(this::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.out.println("❌ [Ingredient] 월별 조회 실패: " + e.getMessage());
            e.printStackTrace();
            return java.util.Collections.emptyList();
        }
    }

    @Override
    public List<IngredientPurchaseDto> getIngredientPurchasesByWeek(int year, int week) {
        LocalDate start = LocalDate.ofYearDay(year, 1)
                .with(IsoFields.WEEK_OF_WEEK_BASED_YEAR, week)
                .with(DayOfWeek.MONDAY);
        LocalDate end = start.plusDays(6);

        return ingredientRepo.findByDateBetween(start, end).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<IngredientPurchaseDto> getIngredientPurchasesByWeekDate(LocalDate date) {
        LocalDate start = date.with(DayOfWeek.MONDAY);
        LocalDate end = start.plusDays(6);
        return ingredientRepo.findByDateBetween(start, end).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private IngredientPurchaseDto toDto(IngredientPurchase p) {
        IngredientPurchaseDto dto = new IngredientPurchaseDto();
        dto.setId(p.getId());
        dto.setDate(p.getDate());
        dto.setItemName(p.getItemName());
        dto.setQuantity(p.getQuantity());
        dto.setUnitPrice(p.getUnitPrice());
        dto.setTotalPrice(p.getTotalPrice());
        return dto;
    }
}
