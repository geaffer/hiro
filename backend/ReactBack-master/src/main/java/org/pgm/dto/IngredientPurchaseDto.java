package org.pgm.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class IngredientPurchaseDto {
    private Long id;
    private LocalDate date;
    private String itemName;
    private double quantity;
    private int unitPrice;
    private int totalPrice;
}
