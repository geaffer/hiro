package org.pgm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "ingredient_purchases")
@Getter
@Setter
public class IngredientPurchase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private String itemName;

    private double quantity;

    private int unitPrice;

    private int totalPrice;
}
