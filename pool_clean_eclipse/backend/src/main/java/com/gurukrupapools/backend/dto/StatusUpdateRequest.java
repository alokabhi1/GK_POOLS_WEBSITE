package com.gurukrupapools.backend.dto;

import com.gurukrupapools.backend.entity.InquiryStatus;
import jakarta.validation.constraints.NotNull;

public record StatusUpdateRequest(@NotNull InquiryStatus status) {
}