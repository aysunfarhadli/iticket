# --- Stage 1: build frontend ---
FROM node:20-alpine AS frontend
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci --no-audit --no-fund
COPY frontend/ ./
RUN npm run build

# --- Stage 2: build backend (bakes frontend dist into static/) ---
FROM gradle:8.10-jdk17 AS backend
WORKDIR /app
COPY build.gradle settings.gradle ./
COPY gradle gradle
COPY src src
# Inject built SPA into Spring Boot static resources
COPY --from=frontend /app/dist/ src/main/resources/static/
RUN gradle --no-daemon clean bootJar

# --- Stage 3: runtime ---
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
ENV SPRING_PROFILES_ACTIVE=dev \
    JAVA_OPTS="-Xmx400m -XX:+UseSerialGC"
COPY --from=backend /app/build/libs/*.jar app.jar
EXPOSE 8090
# Use $PORT env var (Render/Railway/Fly inject it)
CMD ["sh", "-c", "java $JAVA_OPTS -Dserver.port=${PORT:-8090} -jar app.jar"]
