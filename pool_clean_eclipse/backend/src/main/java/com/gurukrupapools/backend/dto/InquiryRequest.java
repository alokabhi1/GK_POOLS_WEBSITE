package com.gurukrupapools.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record InquiryRequest(
        @NotBlank @Size(max = 120) String name,
        @NotBlank @Email @Size(max = 160) String email,
        @NotBlank @Size(max = 30) String phone,
        @Size(max = 120) String service,
        @NotBlank @Size(max = 3000) String message
) {
}