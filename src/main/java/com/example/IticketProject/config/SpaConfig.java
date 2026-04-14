package com.example.IticketProject.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SpaConfig implements WebMvcConfigurer {
    @Override
    public void addViewControllers(ViewControllerRegistry r) {
        r.addViewController("/").setViewName("forward:/index.html");
        r.addViewController("/{path:[^\\.]*}").setViewName("forward:/index.html");
        r.addViewController("/{p1:[^\\.]*}/{p2:[^\\.]*}").setViewName("forward:/index.html");
        r.addViewController("/{p1:[^\\.]*}/{p2:[^\\.]*}/{p3:[^\\.]*}").setViewName("forward:/index.html");
    }
}
