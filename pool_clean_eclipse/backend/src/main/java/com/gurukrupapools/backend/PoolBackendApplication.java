package com.gurukrupapools.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class PoolBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(PoolBackendApplication.class, args);
    }
}
