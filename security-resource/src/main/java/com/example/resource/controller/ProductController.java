package com.example.resource.controller;

import com.example.resource.dto.AddProductDto;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.resource.entity.Product;
import com.example.resource.repository.ProductRepository;
import com.example.resource.dto.BaseResponseDto;
import com.example.resource.dto.ApiResponseType;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // 모든 사용자 (ROLE_USER, ROLE_ADMIN)에게 GET 접근 허용
    @GetMapping
//    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public BaseResponseDto<List<Product>> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return new BaseResponseDto<>(ApiResponseType.SUCCESS, products);
    }

    // ROLE_ADMIN만 접근 가능: 상품 생성
    @PostMapping
    public BaseResponseDto<Product> createProduct(@RequestBody AddProductDto dto) {
        // DTO를 엔티티로 변환
        Product product = Product.builder()
                .name(dto.name())
                .price(dto.price())
                .description(dto.description())
                .build();
        // 변환한 엔티티를 저장
        Product savedProduct = productRepository.save(product);
        return new BaseResponseDto<>(ApiResponseType.SUCCESS, savedProduct);
    }


    // ROLE_ADMIN만 접근 가능: 상품 수정 (POST 방식)
    @PostMapping("/{id}")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public BaseResponseDto<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id " + id));
        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        Product updatedProduct = productRepository.save(product);
        return new BaseResponseDto<>(ApiResponseType.SUCCESS, updatedProduct);
    }

    // ROLE_ADMIN만 접근 가능: 상품 삭제 (POST 방식, URL 예시: /api/products/delete/{id})
    @PostMapping("/delete/{id}")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public BaseResponseDto<Void> deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return new BaseResponseDto<>(ApiResponseType.SUCCESS, null);
    }
}
