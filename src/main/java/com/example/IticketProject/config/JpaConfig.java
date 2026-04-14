package com.example.IticketProject.config;

import com.example.IticketProject.IticketProjectApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration
@EnableJpaAuditing
@ConfigurationPropertiesScan(basePackageClasses = IticketProjectApplication.class)
public class JpaConfig {}
