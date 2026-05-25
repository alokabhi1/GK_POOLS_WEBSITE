package com.gurukrupapools.backend.dto;

import com.gurukrupapools.backend.entity.InquiryStatus;
import java.time.LocalDateTime;

public record InquiryResponse(
        Long id,
        String name,
        String email,
        String phone,
        String service,
        String message,
        InquiryStatus status,
        LocalDateTime createdAt
) {
}