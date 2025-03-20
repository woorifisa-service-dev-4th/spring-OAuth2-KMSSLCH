package com.example.resource.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BaseResponseDto<T> {
    // Getter & Setter
    private String status;
    private String message;
    private T data;

    public BaseResponseDto() {
    }

    public BaseResponseDto(ApiResponseType responseType, T data) {
        this.status = responseType.getStatus();
        this.message = responseType.getMessage();
        this.data = data;
    }

}
