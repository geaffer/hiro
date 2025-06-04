package org.pgm.service;

import lombok.RequiredArgsConstructor;
import org.pgm.dto.RevenueDto;
import org.pgm.entity.Revenue;
import org.pgm.repository.RevenueRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RevenueServiceImpl implements RevenueService {

    private final RevenueRepository revenueRepo;

    @Override
    public RevenueDto create(RevenueDto dto) {
        Revenue r = new Revenue();
        r.setDate(dto.getDate());
        r.setRevenue(dto.getRevenue());  // ✅ 수정됨
        r.setMemo(dto.getMemo());
        r.setWeekday(getWeekday(dto.getDate()));
        Revenue saved = revenueRepo.save(r);

        dto.setId(saved.getId());
        dto.setWeekday(saved.getWeekday());
        return dto;
    }

    @Override
    public List<RevenueDto> getAll() {
        return revenueRepo.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        try {
            revenueRepo.deleteById(id);
        } catch (Exception e) {
            System.out.println("❌ 삭제 중 오류 발생: " + e.getMessage());
        }
    }

    @Override
    public List<RevenueDto> getByMonth(YearMonth ym) {
        LocalDate start = ym.atDay(1);
        LocalDate end = ym.atEndOfMonth();
        return revenueRepo.findByDateBetween(start, end).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public RevenueDto getHighestRevenue() {
        return revenueRepo.findAll().stream()
                .max(Comparator.comparingLong(Revenue::getRevenue))  // ✅ 수정됨
                .map(this::toDto)
                .orElse(null);
    }

    @Override
    public RevenueDto getLowestRevenue() {
        return revenueRepo.findAll().stream()
                .min(Comparator.comparingLong(Revenue::getRevenue))  // ✅ 수정됨
                .map(this::toDto)
                .orElse(null);
    }

    private RevenueDto toDto(Revenue r) {
        RevenueDto dto = new RevenueDto();
        dto.setId(r.getId());
        dto.setDate(r.getDate());
        dto.setRevenue(r.getRevenue());  // ✅ 수정됨
        dto.setMemo(r.getMemo());
        dto.setWeekday(r.getWeekday());
        return dto;
    }

    private String getWeekday(LocalDate date) {
        DayOfWeek day = date.getDayOfWeek();
        return switch (day) {
            case MONDAY -> "월요일";
            case TUESDAY -> "화요일";
            case WEDNESDAY -> "수요일";
            case THURSDAY -> "목요일";
            case FRIDAY -> "금요일";
            case SATURDAY -> "토요일";
            case SUNDAY -> "일요일";
        };
    }
    @Override
    public List<RevenueDto> getByWeek(int year, int week) {
    // ISO 기준: 1주차는 가장 첫 번째 목요일을 포함한 주
    LocalDate start = LocalDate.ofYearDay(year, 1).with(java.time.temporal.IsoFields.WEEK_OF_WEEK_BASED_YEAR, week)
                                                        .with(java.time.DayOfWeek.MONDAY);
    LocalDate end = start.plusDays(6);
    return revenueRepo.findByDateBetween(start, end)
            .stream()
            .map(this::toDto)
            .collect(Collectors.toList());

    }@Override
public List<RevenueDto> getByWeekDate(LocalDate date) {
    LocalDate start = date.with(DayOfWeek.MONDAY);
    LocalDate end = start.plusDays(6);

    return revenueRepo.findByDateBetween(start, end).stream()
            .map(this::toDto)
            .collect(Collectors.toList());
}


}
