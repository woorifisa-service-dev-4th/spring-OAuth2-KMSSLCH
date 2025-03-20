package com.example.authorize.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.oidc.OidcScopes;
import org.springframework.security.oauth2.server.authorization.JdbcOAuth2AuthorizationService;
import org.springframework.security.oauth2.server.authorization.OAuth2AuthorizationService;
import org.springframework.security.oauth2.server.authorization.client.JdbcRegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;

import javax.sql.DataSource;
import java.time.Duration;
import java.util.UUID;

@Configuration
public class OAuth2ServerConfig {

    // ✅ 1. Jdbc 기반 클라이언트 저장소 설정 (Spring Bean으로 등록)
    @Bean
    public RegisteredClientRepository registeredClientRepository(DataSource dataSource) {
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        JdbcRegisteredClientRepository repository = new JdbcRegisteredClientRepository(jdbcTemplate);

        // ✅ 기존 클라이언트가 존재하는지 확인 후 저장
        RegisteredClient existingClient = repository.findByClientId("oauth2-client-app");
        if (existingClient == null) {
            RegisteredClient registeredClient = RegisteredClient.withId(UUID.randomUUID().toString())
                    .clientId("oauth2-client-app")  // ✅ 클라이언트 ID
                    .clientSecret("{noop}secret")  // ✅ 클라이언트 시크릿 (암호화 필요)
                    .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)  // ✅ 클라이언트 인증 방식
                    .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE) // ✅ 인가 코드 방식
                    .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN) // ✅ 리프레시 토큰 허용
                    .redirectUri("http://127.0.0.1:8081") // ✅ 요청 URL과 일치하도록 변경
                    .scope(OidcScopes.OPENID) // ✅ OIDC 스코프
                    .scope("read")
                    .scope("write")
                    .tokenSettings(TokenSettings.builder()
                            .accessTokenTimeToLive(Duration.ofHours(2))  // :흰색_확인_표시: Access Token 만료시간 (기본: 5분 → 2시간)
                            .refreshTokenTimeToLive(Duration.ofDays(30)) // :흰색_확인_표시: Refresh Token 만료시간 (기본: 1시간 → 30일)
                            .build())
                    .clientSettings(ClientSettings.builder()
                            .requireAuthorizationConsent(true)  // ✅ 동의 페이지 활성화
                            .build())
                    .build();

            try {
                repository.save(registeredClient);
                System.out.println("✅ 클라이언트 저장 성공: oauth2-client-app");
            } catch (Exception e) {
                System.err.println("❌ 클라이언트 저장 실패: " + e.getMessage());
            }
        } else {
            System.out.println("ℹ️ 클라이언트가 이미 존재함: oauth2-client-app");
        }

        return repository;
    }

    // ✅ 2. 인가 코드 및 토큰을 DB에서 관리하는 서비스 등록
    @Bean
    public OAuth2AuthorizationService authorizationService(DataSource dataSource, RegisteredClientRepository registeredClientRepository) {
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return new JdbcOAuth2AuthorizationService(jdbcTemplate, registeredClientRepository);
    }
}
