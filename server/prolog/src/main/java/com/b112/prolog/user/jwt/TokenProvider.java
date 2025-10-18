package com.b112.prolog.user.jwt;

import com.b112.prolog.user.entity.User;
import com.b112.prolog.user.entity.UserPrincipal;
import com.b112.prolog.user.exception.NotAuthenticatedException;
import com.b112.prolog.user.exception.UserNotFoundException;
import com.b112.prolog.user.repository.UserRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.security.Key;
import java.util.Date;

@Slf4j
@Component
public class TokenProvider {
    public static final String ACCESS_TOKEN_NAME = "access_token";
    public static final String REFRESH_TOKEN_NAME = "refresh_token";
    public static final String AUTHORIZATION_PREFIX = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";
    public static final long ACCESS_TOKEN_EXPIRE_TIME_IN_MILLISECONDS = 1000L * 60L * 60L * 24L * 7L; // 1week
    public static final long REFRESH_TOKEN_EXPIRE_TIME_IN_MILLISECONDS = 1000L * 60L * 60L * 24L * 14L; // 2weeks
    public static final String ISSUER = "ProLog";

    @Value("${jwt.secret.key}")
    private String secret;
    private Key keyStream;
    private Date date;

    private final UserRepository userRepository;

    public TokenProvider(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostConstruct
    public void init() {
        byte[] key = Decoders.BASE64URL.decode(secret);
        this.keyStream = Keys.hmacShaKeyFor(key);
        this.date = new Date();
    }

    public boolean isValidToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(keyStream)
                    .build().parseClaimsJws(token);
            return true;

        } catch (ExpiredJwtException e) {
            log.error("Expired Token");
        } catch (UnsupportedJwtException | MalformedJwtException e) {
            log.error("Unsupported Token Type");
        } catch (IllegalArgumentException e) {
            log.error("Null or empty token");
        } catch (SignatureException e) {
            log.error("Invalid Token Signature");
        }
        return false;
    }

    private String getJwt(UserPrincipal principal, long tokenExpireTimeInMilliseconds, String tokenName) {
        Date rtkExpiryDate = new Date(date.getTime() + tokenExpireTimeInMilliseconds);

        if(principal.getEmail().isEmpty()) {
            throw new NotAuthenticatedException();
        }

        return Jwts.builder()
                .claim("type", tokenName)
                .setIssuer(ISSUER)
                .setSubject(principal.getEmail())
                .setIssuedAt(date)
                .setExpiration(rtkExpiryDate)
                .setNotBefore(date)
                .signWith(keyStream, SignatureAlgorithm.HS256)
                .compact();
    }

    public String createAccessToken(UserPrincipal principal) {
        return getJwt(principal, ACCESS_TOKEN_EXPIRE_TIME_IN_MILLISECONDS, ACCESS_TOKEN_NAME);
    }

    public String createRefreshToken(UserPrincipal principal) {
        return getJwt(principal, REFRESH_TOKEN_EXPIRE_TIME_IN_MILLISECONDS, REFRESH_TOKEN_NAME);
    }

    public Authentication getAuthentication(String accessToken) {
        Claims claims = parseClaims(accessToken);

        User user = userRepository.findUserByEmail(claims.getSubject()).orElseThrow(UserNotFoundException::new);
        UserPrincipal principal = UserPrincipal.create(user);

        return new LoginAuthenticationToken(principal);
    }

    public Claims parseClaims(String accessToken) {
        return Jwts.parserBuilder().setSigningKey(keyStream)
                .build().parseClaimsJws(accessToken).getBody();
    }

    public String getTokenType(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(keyStream)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getOrDefault("type", ACCESS_TOKEN_NAME).toString();
    }

    public String resolveToken(HttpServletRequest request) {
        String token = request.getHeader(AUTHORIZATION_PREFIX);

        if (!StringUtils.hasText(token) || !token.startsWith(BEARER_PREFIX)) {
            return null;
        }
        return token.substring(BEARER_PREFIX.length());
    }
}
