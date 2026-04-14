package com.example.IticketProject.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "venues")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Venue extends BaseEntity {
    @Column(nullable = false, length = 160)
    private String name;

    @Column(length = 255)
    private String address;

    @Column
    private Integer capacity;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "city_id")
    private City city;
}
