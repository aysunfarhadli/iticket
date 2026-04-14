package com.example.IticketProject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class IticketProjectApplication {
	public static void main(String[] args) {
		SpringApplication.run(IticketProjectApplication.class, args);
	}
}
