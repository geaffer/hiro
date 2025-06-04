package org.pgm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "other_expenses")
@Getter
@Setter
public class OtherExpense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String item;
    private LocalDate date;
    private Long amount;
    private String memo;
}
