package com.gurukrupapools.backend.service;

import com.gurukrupapools.backend.dto.InquiryRequest;
import com.gurukrupapools.backend.dto.InquiryResponse;
import com.gurukrupapools.backend.entity.Inquiry;
import com.gurukrupapools.backend.entity.InquiryStatus;
import com.gurukrupapools.backend.exception.ResourceNotFoundException;
import com.gurukrupapools.backend.repository.InquiryRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class InquiryService {

    private final InquiryRepository inquiryRepository;
    private final AdminNotificationService adminNotificationService;

    public InquiryService(InquiryRepository inquiryRepository, AdminNotificationService adminNotificationService) {
        this.inquiryRepository = inquiryRepository;
        this.adminNotificationService = adminNotificationService;
    }

    @Transactional
    public InquiryResponse create(InquiryRequest request) {
        Inquiry inquiry = new Inquiry();
        inquiry.setName(request.name().trim());
        inquiry.setEmail(request.email().trim());
        inquiry.setPhone(request.phone().trim());
        inquiry.setService(request.service() == null ? null : request.service().trim());
        inquiry.setMessage(request.message().trim());
        Inquiry savedInquiry = inquiryRepository.save(inquiry);
        adminNotificationService.sendNewInquiryEmail(savedInquiry);
        return toResponse(savedInquiry);
    }

    @Transactional(readOnly = true)
    public List<InquiryResponse> findAll(InquiryStatus status) {
        List<Inquiry> inquiries = status == null
                ? inquiryRepository.findAllByOrderByCreatedAtDesc()
                : inquiryRepository.findByStatusOrderByCreatedAtDesc(status);
        return inquiries.stream().map(this::toResponse).toList();
    }

    @Transactional
    public InquiryResponse updateStatus(Long id, InquiryStatus status) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inquiry not found: " + id));
        inquiry.setStatus(status);
        return toResponse(inquiry);
    }

    private InquiryResponse toResponse(Inquiry inquiry) {
        return new InquiryResponse(
                inquiry.getId(),
                inquiry.getName(),
                inquiry.getEmail(),
                inquiry.getPhone(),
                inquiry.getService(),
                inquiry.getMessage(),
                inquiry.getStatus(),
                inquiry.getCreatedAt()
        );
    }
}
