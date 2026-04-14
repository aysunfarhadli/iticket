package com.example.IticketProject.repository;

import com.example.IticketProject.entity.Event;
import com.example.IticketProject.enums.EventStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long>, JpaSpecificationExecutor<Event> {
    Page<Event> findAllByStatus(EventStatus status, Pageable pageable);
    List<Event> findTop8ByStatusAndFeaturedTrueOrderByStartsAtAsc(EventStatus status);
    List<Event> findTop12ByStatusOrderByStartsAtAsc(EventStatus status);
}
