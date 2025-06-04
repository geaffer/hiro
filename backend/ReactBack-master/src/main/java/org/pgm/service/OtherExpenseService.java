package org.pgm.service;

import org.pgm.dto.OtherExpenseDto;

import java.time.YearMonth;
import java.util.List;

public interface OtherExpenseService {
    OtherExpenseDto create(OtherExpenseDto dto);
    List<OtherExpenseDto> getAll();
    void delete(Long id);
    List<OtherExpenseDto> getByMonth(YearMonth ym);
}
