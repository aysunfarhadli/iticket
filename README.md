# Project Acacia — Event Ticketing System

Modern, real-world event ticketing platform — Spring Boot 3 backend + React 18/Vite/TS/Tailwind frontend.

## Tech
**Backend:** Java 17, Spring Boot 3.3, Spring Web/Data JPA/Security/Validation/Mail, JWT (jjwt), MapStruct/Lombok, H2 (dev) + PostgreSQL (prod), Swagger/OpenAPI.
**Frontend:** React 18 + Vite + TypeScript, Tailwind CSS, Axios, React Router 6, Zustand, react-hook-form, react-hot-toast.

## Run

### Backend
```bash
./gradlew bootRun
# → http://localhost:8080/api
# Swagger:  http://localhost:8080/api/swagger-ui.html
# H2:       http://localhost:8080/api/h2
```
H2 ilə demo data avtomatik yüklənir.

### Frontend
```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173 (proxy → /api)
```

## Demo accounts
- **Admin:** `admin@acacia.az` / `admin123`
- **User:**  `user@acacia.az` / `user123`

## Mock card
Sonu **0000** olan hər kart nömrəsi — `FAILED`. Digərləri — `SUCCESS` → invoice + ticket + mock email.

## Profil dəyişdirmə (PostgreSQL)
`./gradlew bootRun --args='--spring.profiles.active=prod'`

## Architecture
```
src/main/java/com/example/IticketProject
├── config/        # JPA, OpenAPI, AppProperties, DemoDataSeeder
├── controller/    # REST endpoints (Auth, Event, Order, Payment, Admin, ...)
├── dto/           # Request/response DTOs (auth, event, order, ...)
├── entity/        # JPA entities (User, Event, Order, Ticket, Invoice, ...)
├── enums/         # RoleType, EventStatus, OrderStatus, PickupMethod, ...
├── exception/     # GlobalExceptionHandler + ApiException
├── mapper/        # Entity ↔ DTO
├── repository/    # Spring Data JPA
├── security/      # JWT auth, SecurityConfig, CurrentUser
└── service/(impl) # Business logic
```

## Frontend pages
Public: Home, Events, EventDetails, Login, Register
User: Checkout, OrderSuccess, Invoice, MyTickets, MyOrders, Profile
Admin: Dashboard, Events, Orders, Users, Categories, Venues, Cities

## Order flow
1. User selects ticket(s) → cart (Zustand persist).
2. `/checkout` — pickup seçimi (E_TICKET / PHYSICAL_PICKUP) + mock kart.
3. `POST /orders/checkout` → `OrderStatus.PENDING`, qoyulmuş `sold` artırılır.
4. `POST /payments` → SUCCESS olduqda: `OrderStatus.PAID`, `Invoice` yaranır, hər `OrderItem.quantity` qədər `Ticket` issue olunur, **async mock email** + `EmailLog`.
