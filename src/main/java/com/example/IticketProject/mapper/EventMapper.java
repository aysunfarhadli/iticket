package com.example.IticketProject.mapper;

import com.example.IticketProject.dto.event.EventResponse;
import com.example.IticketProject.dto.event.TicketTypeResponse;
import com.example.IticketProject.entity.Event;
import com.example.IticketProject.entity.EventImage;
import com.example.IticketProject.entity.TicketType;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EventMapper {
    public TicketTypeResponse toTicketType(TicketType t) {
        return new TicketTypeResponse(t.getId(), t.getName(), t.getPrice(),
                t.getQuota(), t.getSold(), t.available());
    }

    public EventResponse toEvent(Event e) {
        List<TicketTypeResponse> tts = e.getTicketTypes().stream().map(this::toTicketType).toList();
        List<String> imgs = e.getImages().stream().map(EventImage::getUrl).toList();
        return new EventResponse(
                e.getId(), e.getTitle(), e.getSlug(), e.getDescription(), e.getCoverImageUrl(),
                e.getStartsAt(), e.getEndsAt(), e.getStatus(), e.isFeatured(),
                e.getCategory().getName(), e.getCategory().getId(),
                e.getVenue().getName(), e.getVenue().getCity().getName(), e.getVenue().getAddress(),
                tts, imgs);
    }
}
