package org.pgm.service;

import lombok.RequiredArgsConstructor;
import org.pgm.dto.OtherExpenseDto;
import org.pgm.entity.OtherExpense;
import org.pgm.repository.OtherExpenseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OtherExpenseServiceImpl implements OtherExpenseService {

    private final OtherExpenseRepository repo;

    @Override
    public OtherExpenseDto create(OtherExpenseDto dto) {
        OtherExpense e = new OtherExpense();
        e.setItem(dto.getItem());
        e.setDate(dto.getDate());
        e.setAmount(dto.getAmount());
        e.setMemo(dto.getMemo());
        repo.save(e);
        dto.setId(e.getId());
        return dto;
    }

    @Override
    public List<OtherExpenseDto> getAll() {
        return repo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }

    @Override
    public List<OtherExpenseDto> getByMonth(YearMonth ym) {
        LocalDate start = ym.atDay(1);
        LocalDate end = ym.atEndOfMonth();
        return repo.findByDateBetween(start, end).stream().map(this::toDto).collect(Collectors.toList());
    }

    private OtherExpenseDto toDto(OtherExpense e) {
        OtherExpenseDto dto = new OtherExpenseDto();
        dto.setId(e.getId());
        dto.setItem(e.getItem());
        dto.setDate(e.getDate());
        dto.setAmount(e.getAmount());
        dto.setMemo(e.getMemo());
        return dto;
    }
}
