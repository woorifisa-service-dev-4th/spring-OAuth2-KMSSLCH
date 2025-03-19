DROP DATABASE IF EXISTS auth_db;
CREATE DATABASE auth_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE auth_db;

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,     -- 유저 고유 ID
    email VARCHAR(255) NOT NULL UNIQUE,       -- 로그인 이메일
    password VARCHAR(255) NOT NULL,           -- 암호화된 비밀번호
    roles VARCHAR(255) NOT NULL DEFAULT 'ROLE_USER', -- 권한 (e.g., ROLE_USER, ROLE_ADMIN)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- 생성일
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP DATABASE IF EXISTS resource_db;
CREATE DATABASE resource_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE resource_db;

CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,     -- 상품 고유 ID
    name VARCHAR(255) NOT NULL,               -- 상품 이름
    description TEXT,                          -- 상품 설명
    price DECIMAL(10,2) NOT NULL,             -- 상품 가격
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- 생성일
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
