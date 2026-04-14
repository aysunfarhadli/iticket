package com.example.IticketProject.service.impl;

import com.example.IticketProject.dto.event.*;
import com.example.IticketProject.entity.*;
import com.example.IticketProject.enums.EventStatus;
import com.example.IticketProject.exception.NotFoundException;
import com.example.IticketProject.mapper.EventMapper;
import com.example.IticketProject.repository.*;
import com.example.IticketProject.service.EventService;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EventServiceImpl implements EventService {
    private final EventRepository events;
    private final EventCategoryRepository categories;
    private final VenueRepository venues;
    private final EventMapper mapper;

    @Override
    public Page<EventResponse> search(EventSearchRequest req, Pageable pageable) {
        Specification<Event> spec = (root, q, cb) -> {
            List<Predicate> ps = new ArrayList<>();
            ps.add(cb.equal(root.get("status"), EventStatus.PUBLISHED));
            if (req.q() != null && !req.q().isBlank())
                ps.add(cb.like(cb.lower(root.get("title")), "%" + req.q().toLowerCase() + "%"));
            if (req.categoryId() != null)
                ps.add(cb.equal(root.get("category").get("id"), req.categoryId()));
            if (req.cityId() != null)
                ps.add(cb.equal(root.get("venue").get("city").get("id"), req.cityId()));
            if (req.dateFrom() != null)
                ps.add(cb.greaterThanOrEqualTo(root.get("startsAt"), req.dateFrom().atStartOfDay()));
            if (req.dateTo() != null)
                ps.add(cb.lessThanOrEqualTo(root.get("startsAt"), req.dateTo().atTime(LocalTime.MAX)));
            return cb.and(ps.toArray(new Predicate[0]));
        };
        return events.findAll(spec, pageable).map(mapper::toEvent);
    }

    @Override
    public EventResponse get(Long id) {
        return mapper.toEvent(events.findById(id).orElseThrow(() -> new NotFoundException("Event", id)));
    }

    @Override
    public List<EventResponse> featured() {
        return events.findTop8ByStatusAndFeaturedTrueOrderByStartsAtAsc(EventStatus.PUBLISHED)
                .stream().map(mapper::toEvent).toList();
    }

    @Override
    public List<EventResponse> upcoming() {
        return events.findTop12ByStatusOrderByStartsAtAsc(EventStatus.PUBLISHED)
                .stream().map(mapper::toEvent).toList();
    }

    @Override
    @Transactional
    public EventResponse create(EventCreateRequest req) {
        EventCategory cat = categories.findById(req.categoryId())
                .orElseThrow(() -> new NotFoundException("Category", req.categoryId()));
        Venue venue = venues.findById(req.venueId())
                .orElseThrow(() -> new NotFoundException("Venue", req.venueId()));
        Event e = Event.builder()
                .title(req.title()).description(req.description()).coverImageUrl(req.coverImageUrl())
                .startsAt(req.startsAt()).endsAt(req.endsAt())
                .status(req.status() != null ? req.status() : EventStatus.PUBLISHED)
                .featured(req.featured()).category(cat).venue(venue)
                .slug(slug(req.title())).build();
        if (req.ticketTypes() != null) {
            for (TicketTypeRequest tt : req.ticketTypes())
                e.getTicketTypes().add(TicketType.builder()
                        .name(tt.name()).price(tt.price()).quota(tt.quota()).sold(0).event(e).build());
        }
        if (req.images() != null) {
            int i = 0;
            for (String url : req.images())
                e.getImages().add(EventImage.builder().url(url).sortOrder(i++).event(e).build());
        }
        return mapper.toEvent(events.save(e));
    }

    @Override
    @Transactional
    public EventResponse update(Long id, EventUpdateRequest req) {
        Event e = events.findById(id).orElseThrow(() -> new NotFoundException("Event", id));
        e.setTitle(req.title()); e.setDescription(req.description());
        e.setCoverImageUrl(req.coverImageUrl()); e.setStartsAt(req.startsAt()); e.setEndsAt(req.endsAt());
        if (req.status() != null) e.setStatus(req.status());
        e.setFeatured(req.featured()); e.setSlug(slug(req.title()));
        e.setCategory(categories.findById(req.categoryId())
                .orElseThrow(() -> new NotFoundException("Category", req.categoryId())));
        e.setVenue(venues.findById(req.venueId())
                .orElseThrow(() -> new NotFoundException("Venue", req.venueId())));
        return mapper.toEvent(e);
    }

    @Override
    public void delete(Long id) {
        if (!events.existsById(id)) throw new NotFoundException("Event", id);
        events.deleteById(id);
    }

    private String slug(String s) {
        return s.toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("(^-|-$)", "");
    }
}
