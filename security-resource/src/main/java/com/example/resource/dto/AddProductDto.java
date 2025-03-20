package com.example.resource.dto;

import java.math.BigDecimal;

public record AddProductDto(String name, BigDecimal price, String description) {
}
