package com.example.IticketProject.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "email_logs")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class EmailLog extends BaseEntity {
    @Column(nullable = false, length = 160)
    private String toAddress;

    @Column(nullable = false, length = 250)
    private String subject;

    @Lob
    @Column(nullable = false)
    private String body;

    @Column(nullable = false)
    private boolean success;

    @Column(length = 500)
    private String error;
}
