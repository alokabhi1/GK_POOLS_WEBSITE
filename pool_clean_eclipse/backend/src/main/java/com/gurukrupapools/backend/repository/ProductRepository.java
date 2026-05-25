package com.gurukrupapools.backend.repository;

import com.gurukrupapools.backend.entity.Product;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByActiveTrueOrderByDisplayOrderAsc();
}