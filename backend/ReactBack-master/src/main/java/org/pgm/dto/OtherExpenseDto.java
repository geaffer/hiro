package org.pgm.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class OtherExpenseDto {
    private Long id;
    private String item;
    private LocalDate date;
    private Long amount;
    private String memo;
}
