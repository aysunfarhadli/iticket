package com.example.IticketProject.security;

import com.example.IticketProject.config.AppProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    private final SecretKey key;
    private final long ttlMs;

    public JwtService(AppProperties props) {
        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(props.security().jwt().secret()));
        this.ttlMs = props.security().jwt().accessTokenTtlMinutes() * 60_000L;
    }

    public String generate(String email, Map<String, Object> claims) {
        long now = System.currentTimeMillis();
        return Jwts.builder().claims(claims).subject(email)
                .issuedAt(new Date(now)).expiration(new Date(now + ttlMs))
                .signWith(key).compact();
    }

    public long ttlSeconds() { return ttlMs / 1000; }
    public String extractUsername(String token) { return parse(token, Claims::getSubject); }
    public boolean isValid(String token, String email) {
        try {
            Claims c = parseAll(token);
            return c.getSubject().equals(email) && c.getExpiration().after(new Date());
        } catch (Exception e) { return false; }
    }
    private <T> T parse(String token, Function<Claims, T> fn) { return fn.apply(parseAll(token)); }
    private Claims parseAll(String token) {
        return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
    }
}
