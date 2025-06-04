package org.pgm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "fixed_costs")
@Getter
@Setter
public class FixedCost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private LocalDate date;

    @Column(nullable = false)
    private Long amount;

    private String memo;

    private boolean recurring; // 매달 반복 여부
}
