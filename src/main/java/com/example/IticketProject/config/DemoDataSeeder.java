package com.example.IticketProject.config;

import com.example.IticketProject.entity.*;
import com.example.IticketProject.enums.EventStatus;
import com.example.IticketProject.enums.RoleType;
import com.example.IticketProject.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class DemoDataSeeder implements CommandLineRunner {

    private final RoleRepository roles;
    private final UserRepository users;
    private final CityRepository cities;
    private final VenueRepository venues;
    private final EventCategoryRepository categories;
    private final EventRepository events;
    private final PasswordEncoder encoder;

    @Override
    @Transactional
    public void run(String... args) {
        if (users.count() > 0) { log.info("Demo data already present, skipping seed."); return; }
        log.info("Seeding demo data...");

        Role admin = roles.save(Role.builder().name(RoleType.ADMIN).build());
        Role user = roles.save(Role.builder().name(RoleType.USER).build());

        users.save(User.builder().firstName("Admin").lastName("iTicket")
                .email("admin@iticket.az").passwordHash(encoder.encode("admin123"))
                .enabled(true).roles(new HashSet<>(Set.of(admin, user))).build());
        users.save(User.builder().firstName("Aysun").lastName("Farhadli")
                .email("user@iticket.az").passwordHash(encoder.encode("user123"))
                .enabled(true).roles(new HashSet<>(Set.of(user))).build());

        City baku = cities.save(City.builder().name("Bakı").country("Azərbaycan").build());
        City ganja = cities.save(City.builder().name("Gəncə").country("Azərbaycan").build());
        City sumqayit = cities.save(City.builder().name("Sumqayıt").country("Azərbaycan").build());

        Venue heydar = venues.save(Venue.builder().name("Heydər Əliyev Sarayı")
                .address("Heydər Əliyev pr., Bakı").capacity(2400).city(baku).build());
        Venue baku_arena = venues.save(Venue.builder().name("Bakı Kristal Zalı")
                .address("Milli Bayraq Meydanı 7, Bakı").capacity(25000).city(baku).build());
        Venue ganja_dram = venues.save(Venue.builder().name("Cəfər Cabbarlı Dram Teatrı")
                .address("Mərkəz, Gəncə").capacity(800).city(ganja).build());

        EventCategory concert = categories.save(EventCategory.builder().name("Konsert").slug("concert").icon("music").build());
        EventCategory theatre = categories.save(EventCategory.builder().name("Teatr").slug("theatre").icon("masks").build());
        EventCategory festival = categories.save(EventCategory.builder().name("Festival").slug("festival").icon("party").build());
        EventCategory sport = categories.save(EventCategory.builder().name("İdman").slug("sport").icon("ball").build());
        EventCategory cinema = categories.save(EventCategory.builder().name("Kino").slug("cinema").icon("film").build());
        EventCategory comedy = categories.save(EventCategory.builder().name("Stand-up").slug("standup").icon("mic").build());
        EventCategory kids = categories.save(EventCategory.builder().name("Uşaq tədbiri").slug("kids").icon("balloon").build());

        seedEvent("Jazz Night with Aziza Mustafa Zadeh", "Unudulmaz caz axşamı, dünyaca məşhur pianoçu ilə.",
                "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1200",
                LocalDateTime.now().plusDays(14).withHour(20).withMinute(0),
                concert, heydar, true,
                List.of(tt("VIP", new BigDecimal("250.00"), 50),
                        tt("Standart", new BigDecimal("80.00"), 400),
                        tt("Yuxarı mərtəbə", new BigDecimal("45.00"), 600)));

        seedEvent("Acacia Pop Festival 2026", "İlin ən böyük pop festivalı — 8 saat, 12 sənətçi.",
                "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200",
                LocalDateTime.now().plusDays(45).withHour(18).withMinute(30),
                festival, baku_arena, true,
                List.of(tt("Fan Pit", new BigDecimal("120.00"), 1000),
                        tt("Tribuna", new BigDecimal("60.00"), 8000)));

        seedEvent("Hamlet — Klassik Səhnə", "Şekspir klassikası yeni rejissor oxunuşunda.",
                "https://images.unsplash.com/photo-1503095396549-807759245b35?w=1200",
                LocalDateTime.now().plusDays(7).withHour(19).withMinute(0),
                theatre, ganja_dram, true,
                List.of(tt("Parter", new BigDecimal("35.00"), 200),
                        tt("Lojа", new BigDecimal("50.00"), 80)));

        seedEvent("Qarabağ FK vs Neftçi PFK", "Topaz Premyer Liqası — derbi matçı.",
                "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200",
                LocalDateTime.now().plusDays(10).withHour(21).withMinute(0),
                sport, baku_arena, true,
                List.of(tt("VIP Lojа", new BigDecimal("200.00"), 100),
                        tt("Sektor A", new BigDecimal("25.00"), 5000),
                        tt("Sektor B", new BigDecimal("15.00"), 8000)));

        seedEvent("Stand-up Night: Murad Dadaşov", "Bir saatlıq yeni proqram, yalnız 18+.",
                "https://images.unsplash.com/photo-1525348371953-bb195b8da11c?w=1200",
                LocalDateTime.now().plusDays(21).withHour(20).withMinute(30),
                comedy, heydar, false,
                List.of(tt("Front Row", new BigDecimal("70.00"), 50),
                        tt("Standart", new BigDecimal("35.00"), 400)));

        seedEvent("Dune: Part Three — Premyera Gecəsi", "Dünya premyerası ilə eyni gündə xüsusi seans.",
                "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=1200",
                LocalDateTime.now().plusDays(30).withHour(22).withMinute(0),
                cinema, heydar, false,
                List.of(tt("IMAX", new BigDecimal("28.00"), 300),
                        tt("Standart", new BigDecimal("18.00"), 500)));

        seedEvent("Maşa və Ayı — Uşaqlar üçün Şou", "Sevimli qəhrəmanlarla canlı interaktiv tamaşa.",
                "https://images.unsplash.com/photo-1503602642458-232111445657?w=1200",
                LocalDateTime.now().plusDays(5).withHour(12).withMinute(0),
                kids, ganja_dram, true,
                List.of(tt("Ailə paketi (4 nəfər)", new BigDecimal("60.00"), 100),
                        tt("Tək bilet", new BigDecimal("18.00"), 400)));

        seedEvent("Symphony Under The Stars", "Açıq havada simfonik orkestr konserti.",
                "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200",
                LocalDateTime.now().plusDays(60).withHour(21).withMinute(0),
                concert, baku_arena, false,
                List.of(tt("VIP", new BigDecimal("180.00"), 80),
                        tt("Standart", new BigDecimal("55.00"), 1500)));

        log.info("Seed completed: {} events.", events.count());
    }

    private record TT(String name, BigDecimal price, int quota) {}
    private TT tt(String n, BigDecimal p, int q) { return new TT(n, p, q); }

    private void seedEvent(String title, String desc, String cover, LocalDateTime starts,
                           EventCategory cat, Venue venue, boolean featured, List<TT> tts) {
        Event e = Event.builder()
                .title(title).description(desc).coverImageUrl(cover)
                .startsAt(starts).endsAt(starts.plusHours(3))
                .status(EventStatus.PUBLISHED).featured(featured).category(cat).venue(venue)
                .slug(title.toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("(^-|-$)", ""))
                .build();
        for (TT t : tts) {
            e.getTicketTypes().add(TicketType.builder()
                    .name(t.name()).price(t.price()).quota(t.quota()).sold(0).event(e).build());
        }
        e.getImages().add(EventImage.builder().url(cover).sortOrder(0).event(e).build());
        events.save(e);
    }
}
