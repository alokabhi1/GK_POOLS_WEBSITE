package com.gurukrupapools.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AdminAccessService {

    private final String adminApiToken;

    public AdminAccessService(@Value("${app.admin.api-token:}") String adminApiToken) {
        this.adminApiToken = adminApiToken;
    }

    public void requireAdminToken(String providedToken) {
        if (!StringUtils.hasText(adminApiToken)) {
            throw new ResponseStatusException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "Admin API token is not configured."
            );
        }

        if (!adminApiToken.equals(providedToken)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid admin API token.");
        }
    }
}
