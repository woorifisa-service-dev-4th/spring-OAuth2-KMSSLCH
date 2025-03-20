package com.example.authorize.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.MediaType;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configurers.OAuth2AuthorizationServerConfigurer;
import org.springframework.security.oauth2.server.authorization.settings.AuthorizationServerSettings;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.util.matcher.MediaTypeRequestMatcher;

@Configuration
public class SecurityConfig {


    // ✅ 1. OAuth2 인가 서버 보안 필터 체인
    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) throws Exception {
        OAuth2AuthorizationServerConfiguration.applyDefaultSecurity(http);
        http.getConfigurer(OAuth2AuthorizationServerConfigurer.class)
                .oidc(Customizer.withDefaults());  // OpenID Connect 지원


        // 인증되지 않은 사용자는 /login 페이지로 이동
        http.exceptionHandling(exceptions -> exceptions.defaultAuthenticationEntryPointFor(
                new LoginUrlAuthenticationEntryPoint("/login"),
                new MediaTypeRequestMatcher(MediaType.TEXT_HTML)
        ));

        // JWT 토큰 검증 활성화
        http.oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt);

        return http.build();
    }

    // ✅ 2. 기본 로그인 폼 활성화
    @Bean
    @Order(Ordered.LOWEST_PRECEDENCE)
    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/oauth2/authorize").authenticated()
                        .anyRequest().permitAll()
                )
                .formLogin(Customizer.withDefaults())  // Spring Security 기본 로그인 폼 사용
                .logout(Customizer.withDefaults());  // 로그아웃 지원

        return http.build();
    }

    // ✅ 3. OAuth2 Authorization Server 설정
    @Bean
    public AuthorizationServerSettings authorizationServerSettings() {
        return AuthorizationServerSettings.builder()
                .issuer("http://localhost:9000")  // OAuth2 인가 서버 URL
                .build();
    }

}