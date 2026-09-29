package org.example.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.cors")
public record CorsProperties(String allowedOrigin) {
    public CorsProperties {
        if (allowedOrigin == null || allowedOrigin.isBlank()) {
            throw new IllegalArgumentException("app.cors.allowed-origin must be set");
        }
    }
}
