package com.example.resource.dto;

import lombok.Getter;

@Getter
public enum ApiResponseType {
    SUCCESS("200", "성공"),
    INVALID_TOKEN("401", "인증 실패"),
    FORBIDDEN("403", "권한 없음"),
    OUTDATED_TOKEN("419", "토큰 만료"),
    ERROR("500", "서버 오류");

    private final String status;
    private final String message;

    ApiResponseType(String status, String message) {
        this.status = status;
        this.message = message;
    }
}
