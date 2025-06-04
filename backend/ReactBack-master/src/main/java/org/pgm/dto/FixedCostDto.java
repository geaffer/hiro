package org.pgm.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class FixedCostDto {
    private Long id;
    private String type;
    private String name;
    private LocalDate date;
    private Long amount;
    private String memo;
    private boolean recurring;
}
