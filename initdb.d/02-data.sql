-- ================================
-- 1. security 스키마 기본 데이터
-- ================================
USE security;

-- 기본 OAuth 클라이언트 데이터 삽입
INSERT INTO clients (client_id, client_secret, redirect_uri)
VALUES ('client-app', 'client-secret', 'http://localhost:3000/callback');

-- (필요하다면 인가 코드나 액세스 토큰 관련 데이터도 추가 가능)


-- ================================
-- 2. userdata 스키마 기본 데이터
-- ================================
USE userdata;

-- 아래의 비밀번호는 평문 "password"를 BCrypt 알고리즘(해시 10회 적용)으로 암호화한 예시입니다.
-- 예시 해시: $2a$10$7EqJtq98hPqEX7fNZaFWoOe8CJ1OisJ1/dq/0Voj5W08eEkR/m7e
INSERT INTO users (username, password, email)
VALUES ('user1', '$2a$10$7EqJtq98hPqEX7fNZaFWoOe8CJ1OisJ1/dq/0Voj5W08eEkR/m7e', 'user1@example.com');
