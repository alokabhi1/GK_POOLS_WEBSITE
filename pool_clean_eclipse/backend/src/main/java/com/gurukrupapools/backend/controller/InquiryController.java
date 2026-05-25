package com.gurukrupapools.backend.controller;

import com.gurukrupapools.backend.dto.InquiryRequest;
import com.gurukrupapools.backend.dto.InquiryResponse;
import com.gurukrupapools.backend.dto.StatusUpdateRequest;
import com.gurukrupapools.backend.entity.InquiryStatus;
import com.gurukrupapools.backend.service.AdminAccessService;
import com.gurukrupapools.backend.service.InquiryService;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/inquiries")
public class InquiryController {

    private final InquiryService inquiryService;
    private final AdminAccessService adminAccessService;

    public InquiryController(InquiryService inquiryService, AdminAccessService adminAccessService) {
        this.inquiryService = inquiryService;
        this.adminAccessService = adminAccessService;
    }

    @PostMapping
    public ResponseEntity<InquiryResponse> create(@Valid @RequestBody InquiryRequest request) {
        InquiryResponse response = inquiryService.create(request);
        return ResponseEntity.created(URI.create("/api/inquiries/" + response.id())).body(response);
    }

    @GetMapping
    public List<InquiryResponse> list(
            @RequestHeader(value = "X-Admin-Token", required = false) String adminToken,
            @RequestParam(required = false) InquiryStatus status) {
        adminAccessService.requireAdminToken(adminToken);
        return inquiryService.findAll(status);
    }

    @PatchMapping("/{id}/status")
    public InquiryResponse updateStatus(
            @RequestHeader(value = "X-Admin-Token", required = false) String adminToken,
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateRequest request) {
        adminAccessService.requireAdminToken(adminToken);
        return inquiryService.updateStatus(id, request.status());
    }
}
