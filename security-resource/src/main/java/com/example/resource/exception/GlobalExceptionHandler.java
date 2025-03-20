package com.example.resource.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import com.example.resource.dto.BaseResponseDto;
import com.example.resource.dto.ApiResponseType;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<BaseResponseDto<Object>> handleAllExceptions(Exception ex) {
        // 예외 발생 시 ApiResponseType.ERROR를 사용하고, 메시지를 세팅
        BaseResponseDto<Object> response = new BaseResponseDto<>(ApiResponseType.ERROR, null);
        response.setMessage(ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
