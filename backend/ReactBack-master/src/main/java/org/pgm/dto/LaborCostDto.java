package org.pgm.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class LaborCostDto {
    private Long id;
    private String type;
    private String name;
    private LocalDate date;
    private Double hours;
    private Integer hourlyWage;
    private Integer monthlySalary;
    private String memo;
}
