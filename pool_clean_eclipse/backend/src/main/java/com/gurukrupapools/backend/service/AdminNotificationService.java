package com.gurukrupapools.backend.service;

import com.gurukrupapools.backend.entity.Inquiry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class AdminNotificationService {

    private static final Logger log = LoggerFactory.getLogger(AdminNotificationService.class);

    private final ObjectProvider<JavaMailSender> mailSenderProvider;
    private final String adminEmail;
    private final String fromEmail;

    public AdminNotificationService(
            ObjectProvider<JavaMailSender> mailSenderProvider,
            @Value("${app.notifications.admin-email:}") String adminEmail,
            @Value("${app.notifications.from-email:no-reply@gurukrupapools.com}") String fromEmail) {
        this.mailSenderProvider = mailSenderProvider;
        this.adminEmail = adminEmail;
        this.fromEmail = fromEmail;
    }

    public void sendNewInquiryEmail(Inquiry inquiry) {
        if (!StringUtils.hasText(adminEmail)) {
            log.info("Admin email is not configured. Inquiry {} was saved without email notification.", inquiry.getId());
            return;
        }

        JavaMailSender mailSender = mailSenderProvider.getIfAvailable();
        if (mailSender == null) {
            log.warn("JavaMailSender is not configured. Inquiry {} was saved without email notification.", inquiry.getId());
            return;
        }

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(adminEmail);
            message.setFrom(fromEmail);
            message.setReplyTo(inquiry.getEmail());
            message.setSubject("New Pool Enquiry - " + inquiry.getName());
            message.setText(buildEmailBody(inquiry));
            mailSender.send(message);
            log.info("New inquiry email sent to admin for inquiry {}.", inquiry.getId());
        } catch (Exception exception) {
            log.error("Inquiry {} was saved, but email notification failed.", inquiry.getId(), exception);
        }
    }

    private String buildEmailBody(Inquiry inquiry) {
        return "New customer enquiry received\n\n"
                + "Inquiry ID: " + inquiry.getId() + "\n"
                + "Name: " + inquiry.getName() + "\n"
                + "Email: " + inquiry.getEmail() + "\n"
                + "Phone: " + inquiry.getPhone() + "\n"
                + "Service: " + valueOrDash(inquiry.getService()) + "\n"
                + "Status: " + inquiry.getStatus() + "\n"
                + "Submitted At: " + inquiry.getCreatedAt() + "\n\n"
                + "Message:\n" + inquiry.getMessage();
    }

    private String valueOrDash(String value) {
        return StringUtils.hasText(value) ? value : "-";
    }
}