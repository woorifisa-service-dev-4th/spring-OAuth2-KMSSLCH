package com.example.authorize.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class ResourceServerSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // CSRF 비활성화 (필요에 따라 조정)
                .csrf(AbstractHttpConfigurer::disable)
                // 모든 요청에 대해 인증 적용
                .authorizeHttpRequests(authorize -> authorize
                        // Swagger 관련 엔드포인트는 인증 없이 접근 허용
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**",
                                "/swagger-resources/**",
                                "/webjars/**",
                                "/configuration/**"
                        ).permitAll()
                        // /api/products 엔드포인트는 인증 요구
                        .requestMatchers("/api/products/**").authenticated()
                        // 그 외의 요청은 필요에 따라 설정
                        .anyRequest().permitAll()
                )
                // OAuth2 Resource Server로 JWT 토큰 검증 설정
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()));

        return http.build();
    }
}