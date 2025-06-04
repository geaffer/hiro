package org.pgm.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class RevenueDto {
    private Long id;
    private LocalDate date;
    private Long revenue;  // 🔄 amount → revenue
    private String memo;
    private String weekday;
}
