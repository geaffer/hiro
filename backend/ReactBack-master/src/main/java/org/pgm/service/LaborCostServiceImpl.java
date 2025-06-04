package org.pgm.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.pgm.dto.LaborCostDto;
import org.pgm.entity.LaborCost;
import org.pgm.repository.LaborCostRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.IsoFields;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LaborCostServiceImpl implements LaborCostService {

    private final LaborCostRepository repo;
    private final ModelMapper modelMapper = new ModelMapper();

    @Override
    public LaborCostDto create(LaborCostDto dto) {
        LaborCost lc = new LaborCost();
        lc.setType(dto.getType());
        lc.setName(dto.getName());
        lc.setDate(dto.getDate());
        lc.setHours(dto.getHours());
        lc.setHourlyWage(dto.getHourlyWage());
        lc.setMonthlySalary(dto.getMonthlySalary());
        lc.setMemo(dto.getMemo());
        LaborCost saved = repo.save(lc);
        dto.setId(saved.getId());
        return dto;
    }

    @Override
    public List<LaborCostDto> getAll() {
        return repo.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }

    @Override
    public List<LaborCostDto> getLaborCostsByMonth(int year, int month) {
        try {
            System.out.println("🟢 [LaborCost] 월별 조회: year=" + year + ", month=" + month);
            LocalDate startDate = LocalDate.of(year, month, 1);
            LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());
            return repo.findByDateBetween(startDate, endDate).stream()
                    .map(this::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.out.println("❌ [LaborCost] 월별 조회 실패: " + e.getMessage());
            e.printStackTrace();
            return java.util.Collections.emptyList();
        }
    }

    @Override
    public List<LaborCostDto> getLaborCostsByWeek(int year, int week) {
        LocalDate start = LocalDate.ofYearDay(year, 1)
                .with(IsoFields.WEEK_OF_WEEK_BASED_YEAR, week)
                .with(DayOfWeek.MONDAY);
        LocalDate end = start.plusDays(6);
        return repo.findAll().stream()
                .filter(lc -> {
                    if ("시급제".equals(lc.getType())) {
                        return lc.getDate() != null && !lc.getDate().isBefore(start) && !lc.getDate().isAfter(end);
                    } else {
                        return lc.getMonthlySalary() != null &&
                                lc.getDate() != null &&
                                lc.getDate().getYear() == year &&
                                lc.getDate().getMonthValue() == start.getMonthValue();
                    }
                })
                .map(lc -> {
                    LaborCostDto dto = toDto(lc);
                    if ("월급제".equals(lc.getType()) && lc.getMonthlySalary() != null) {
                        dto.setMonthlySalary((int) Math.round(lc.getMonthlySalary() / 4.345));
                    }
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<LaborCostDto> getLaborCostsByWeek(LocalDate date) {
        LocalDate start = date.with(DayOfWeek.MONDAY);
        LocalDate end = start.plusDays(6);
        return repo.findAll().stream()
                .filter(lc -> {
                    if ("시급제".equals(lc.getType())) {
                        return lc.getDate() != null && !lc.getDate().isBefore(start) && !lc.getDate().isAfter(end);
                    } else {
                        return lc.getMonthlySalary() != null &&
                                lc.getDate() != null &&
                                lc.getDate().getYear() == date.getYear() &&
                                lc.getDate().getMonthValue() == date.getMonthValue();
                    }
                })
                .map(lc -> {
                    LaborCostDto dto = toDto(lc);
                    if ("월급제".equals(lc.getType()) && lc.getMonthlySalary() != null) {
                        dto.setMonthlySalary((int) Math.round(lc.getMonthlySalary() / 4.345));
                    }
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<LaborCostDto> getLaborCostsByWeekDate(LocalDate date) {
        LocalDate start = date.with(DayOfWeek.MONDAY);
        LocalDate end = start.plusDays(6);
        return repo.findAll().stream()
                .filter(lc -> {
                    if ("시급제".equals(lc.getType())) {
                        return lc.getDate() != null && !lc.getDate().isBefore(start) && !lc.getDate().isAfter(end);
                    } else {
                        return lc.getMonthlySalary() != null &&
                                lc.getDate() != null &&
                                lc.getDate().getYear() == start.getYear() &&
                                lc.getDate().getMonthValue() == start.getMonthValue();
                    }
                })
                .map(lc -> {
                    LaborCostDto dto = toDto(lc);
                    if ("월급제".equals(lc.getType()) && lc.getMonthlySalary() != null) {
                        dto.setMonthlySalary((int) Math.round(lc.getMonthlySalary() / 4.345));
                    }
                    return dto;
                })
                .collect(Collectors.toList());
    }

    private LaborCostDto toDto(LaborCost lc) {
        LaborCostDto dto = new LaborCostDto();
        dto.setId(lc.getId());
        dto.setType(lc.getType());
        dto.setName(lc.getName());
        dto.setDate(lc.getDate());
        dto.setHours(lc.getHours());
        dto.setHourlyWage(lc.getHourlyWage());
        dto.setMemo(lc.getMemo());
        return dto;
    }
}
