package com.example.IticketProject.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "cities")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class City extends BaseEntity {
    @Column(nullable = false, unique = true, length = 80)
    private String name;

    @Column(length = 80)
    private String country;
}
