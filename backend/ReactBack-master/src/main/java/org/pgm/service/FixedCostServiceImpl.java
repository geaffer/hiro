package org.pgm.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.pgm.dto.FixedCostDto;
import org.pgm.entity.FixedCost;
import org.pgm.repository.FixedCostRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.IsoFields;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FixedCostServiceImpl implements FixedCostService {

    private final FixedCostRepository fixedCostRepo;
    private final ModelMapper modelMapper = new ModelMapper();

    @Override
    public FixedCostDto create(FixedCostDto dto) {
        FixedCost fc = new FixedCost();
        fc.setName(dto.getName());
        fc.setDate(dto.getDate());
        fc.setAmount(dto.getAmount());
        fc.setMemo(dto.getMemo());
        fc.setRecurring(dto.isRecurring());

        FixedCost saved = fixedCostRepo.save(fc);
        dto.setId(saved.getId());
        return dto;
    }

    @Override
    public List<FixedCostDto> getAll() {
        return fixedCostRepo.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        fixedCostRepo.deleteById(id);
    }

    @Override
    public List<FixedCostDto> getFixedCostsByMonth(int year, int month) {
        try {
            System.out.println("🟢 [FixedCost] 월별 조회: year=" + year + ", month=" + month);
            LocalDate startDate = LocalDate.of(year, month, 1);
            LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

            List<FixedCost> fixedCosts = fixedCostRepo.findByDateBetween(startDate, endDate);
            return fixedCosts.stream()
                    .map(fc -> modelMapper.map(fc, FixedCostDto.class))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.out.println("❌ [FixedCost] 월별 조회 실패: " + e.getMessage());
            e.printStackTrace();
            return java.util.Collections.emptyList();
        }
    }

    @Override
    public List<FixedCostDto> getFixedCostsByWeek(int year, int week) {
        LocalDate start = LocalDate.ofYearDay(year, 1)
                .with(IsoFields.WEEK_OF_WEEK_BASED_YEAR, week)
                .with(DayOfWeek.MONDAY);

        return fixedCostRepo.findAll().stream()
                .filter(fc -> fc.getDate() != null &&
                        fc.getDate().getYear() == year &&
                        fc.getDate().getMonthValue() == start.getMonthValue())
                .map(fc -> {
                    FixedCostDto dto = toDto(fc);
                    dto.setAmount(Math.round(fc.getAmount() / 4.345));
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<FixedCostDto> getFixedCostsByWeekDate(LocalDate date) {
        LocalDate start = date.with(DayOfWeek.MONDAY);
        LocalDate end = start.plusDays(6);
        return fixedCostRepo.findByDateBetween(start, end).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private FixedCostDto toDto(FixedCost fc) {
        FixedCostDto dto = new FixedCostDto();
        dto.setId(fc.getId());
        dto.setName(fc.getName());
        dto.setDate(fc.getDate());
        dto.setAmount(fc.getAmount());
        dto.setMemo(fc.getMemo());
        dto.setRecurring(fc.isRecurring());
        return dto;
    }
}
