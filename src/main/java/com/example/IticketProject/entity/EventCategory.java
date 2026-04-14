package com.example.IticketProject.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "event_categories")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class EventCategory extends BaseEntity {
    @Column(nullable = false, unique = true, length = 80)
    private String name;

    @Column(length = 64)
    private String slug;

    @Column(length = 64)
    private String icon;
}
