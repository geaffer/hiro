package org.pgm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Entity
@Table(name = "labor_costs")
@Getter
@Setter
public class LaborCost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // "알바" 또는 "직원"
    private String name;
    private LocalDate date;

    // 알바용
    private Double hours;
    private Integer hourlyWage;

    // 직원용
    private Integer monthlySalary;

    private String memo;
}
