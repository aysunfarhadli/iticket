package com.example.IticketProject.service;

import com.example.IticketProject.dto.event.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface EventService {
    Page<EventResponse> search(EventSearchRequest req, Pageable pageable);
    EventResponse get(Long id);
    List<EventResponse> featured();
    List<EventResponse> upcoming();
    EventResponse create(EventCreateRequest req);
    EventResponse update(Long id, EventUpdateRequest req);
    void delete(Long id);
}
