package com.gurukrupapools.backend.repository;

import com.gurukrupapools.backend.entity.Inquiry;
import com.gurukrupapools.backend.entity.InquiryStatus;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
    List<Inquiry> findByStatusOrderByCreatedAtDesc(InquiryStatus status);
    List<Inquiry> findAllByOrderByCreatedAtDesc();
}