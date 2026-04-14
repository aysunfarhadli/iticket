package com.example.IticketProject.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public record AppProperties(Security security, Mail mail, Cors cors) {
    public record Security(Jwt jwt) {}
    public record Jwt(String secret, long accessTokenTtlMinutes, long refreshTokenTtlDays) {}
    public record Mail(String from, boolean mock) {}
    public record Cors(String allowedOrigins) {}
}
