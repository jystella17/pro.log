package com.b112.prolog.user.jwt;

import com.b112.prolog.user.exception.NotAuthenticatedException;
import com.b112.prolog.user.info.DefaultOAuth2UserInfo;
import com.b112.prolog.user.info.OAuth2Provider;
import com.b112.prolog.user.info.OAuth2UserPrincipal;
import com.b112.prolog.user.util.AuthenticationUtils;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.security.Key;
import java.util.Collections;
import java.util.Date;
import java.util.Optional;


@Slf4j
@RequiredArgsConstructor
@Component
public class TokenProvider {

    public static final String ACCESS_TOKEN_NAME = "access_token";
    public static final String REFRESH_TOKEN_NAME = "refresh_token";

    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";

    public static final long ACCESS_TOKEN_EXPIRE_TIME_IN_MILLISECONDS = 1000L * 60L * 30L; // 30min
    public static final int ACCESS_TOKEN_EXPIRE_TIME_IN_SECONDS = 60 * 30; // 30min
    public static final long REFRESH_TOKEN_EXPIRE_TIME_IN_MILLISECONDS = 1000L * 60L * 60L * 24L * 14L; // 2weeks
    public static final int REFRESH_TOKEN_EXPIRE_TIME_IN_SECONDS = 60 * 60 * 24 * 14;
    public static final String ISSUER = "prolog";


    @Value("${jwt.secret}")
    private String secret;
    private Key key;

    @PostConstruct
    public void init() {
        byte[] key = Decoders.BASE64URL.decode(secret);
        this.key = Keys.hmacShaKeyFor(key);
    }

    public boolean validateToken(String token) {

        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);

            return true;
        } catch (UnsupportedJwtException | MalformedJwtException exception) {
            log.error("JWT is not valid");
        } catch (SignatureException exception) {
            log.error("JWT signature validation fails");
        } catch (ExpiredJwtException exception) {
            log.error("JWT is expired");
        } catch (IllegalArgumentException exception) {
            log.error("JWT is null or empty or only whitespace");
        } catch (Exception exception) {
            log.error("JWT validation fails", exception);
        }

        return false;
    }


    public String createAccessToken() {
        return this.createAccessToken(AuthenticationUtils.getCurrentUserId());
    }

    public String createAccessToken(Authentication authentication) {

        String id = Optional.ofNullable(((OAuth2UserPrincipal) authentication.getPrincipal()).getUserInfo().getId()).orElseThrow(NotAuthenticatedException::new);
        return this.createAccessToken(id);
    }

    public String createAccessToken(String id) {
        Date date = new Date();
        Date expiryDate = new Date(date.getTime() + ACCESS_TOKEN_EXPIRE_TIME_IN_MILLISECONDS);

        return Jwts.builder()
                .claim("type", ACCESS_TOKEN_NAME)
                .setIssuer(ISSUER)
                .setSubject(id)
                .setIssuedAt(date)
                .setExpiration(expiryDate)
                .setNotBefore(date)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

    }

    public String createRefreshToken() {
        return this.createRefreshToken(AuthenticationUtils.getCurrentUserId());
    }

    public String createRefreshToken(Authentication authentication) {
        String id = Optional.ofNullable(((OAuth2UserPrincipal) authentication.getPrincipal()).getUserInfo().getId()).orElseThrow(NotAuthenticatedException::new);
        return this.createRefreshToken(id);
    }

    public String createRefreshToken(String id) {
        Date date = new Date();
        Date expiryDate = new Date(date.getTime() + REFRESH_TOKEN_EXPIRE_TIME_IN_MILLISECONDS);

        return Jwts.builder()
                .claim("type", REFRESH_TOKEN_NAME)
                .setIssuer(ISSUER)
                .setSubject(id)
                .setIssuedAt(date)
                .setExpiration(expiryDate)
                .setNotBefore(date)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

    }

    public String resolveToken(HttpServletRequest request) {
        String token = request.getHeader(AUTHORIZATION_HEADER);

        if (StringUtils.hasText(token) && token.startsWith(BEARER_PREFIX)) {
            return token.substring(BEARER_PREFIX.length());
        }

        return null;
    }

    public String getTokenType(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getOrDefault("type", ACCESS_TOKEN_NAME).toString();
    }

    public Authentication getAuthentication(String token) {
        // TODO: 참고) JWT parser 코드
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        OAuth2User user = new OAuth2UserPrincipal(new DefaultOAuth2UserInfo(claims.getSubject()));
        return new OAuth2AuthenticationToken(user, Collections.emptyList(), OAuth2Provider.DEFAULT.getRegistrationId());
    }

}
