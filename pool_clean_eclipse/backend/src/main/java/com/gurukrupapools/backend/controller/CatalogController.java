package com.gurukrupapools.backend.controller;

import com.gurukrupapools.backend.entity.Product;
import com.gurukrupapools.backend.entity.ServiceOffering;
import com.gurukrupapools.backend.repository.ProductRepository;
import com.gurukrupapools.backend.repository.ServiceOfferingRepository;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CatalogController {

    private final ServiceOfferingRepository serviceOfferingRepository;
    private final ProductRepository productRepository;

    public CatalogController(ServiceOfferingRepository serviceOfferingRepository, ProductRepository productRepository) {
        this.serviceOfferingRepository = serviceOfferingRepository;
        this.productRepository = productRepository;
    }

    @GetMapping("/services")
    public List<ServiceOffering> services() {
        return serviceOfferingRepository.findByActiveTrueOrderByDisplayOrderAsc();
    }

    @GetMapping("/products")
    public List<Product> products() {
        return productRepository.findByActiveTrueOrderByDisplayOrderAsc();
    }
}