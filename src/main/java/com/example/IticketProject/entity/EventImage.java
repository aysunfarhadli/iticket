package com.example.IticketProject.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "event_images")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class EventImage extends BaseEntity {
    @Column(nullable = false, length = 500)
    private String url;

    private Integer sortOrder;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "event_id")
    private Event event;
}
