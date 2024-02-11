package com.b112.prolog.user.jwt;

import com.b112.prolog.user.service.RefreshTokenService;
import com.b112.prolog.user.util.CookieUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import static com.b112.prolog.user.jwt.TokenProvider.*;

@Slf4j
@RequiredArgsConstructor
public class RefreshTokenFilter extends OncePerRequestFilter {

    /*
        NOTE: 이 클래스는 Token Refresh를 Filter로 처리하기 위해 생성한 클래스입니다. 나중에 Refactor할 때 사용할 예정입니다.
     */
    private final TokenProvider tokenProvider;
    private final RefreshTokenService refreshTokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = tokenProvider.resolveToken(request);

        log.info("token:" + token);

        if (token != null && token.isEmpty()) {
            String type = tokenProvider.getTokenType(token);

            log.info("type:" + type);
            if (type.equals(REFRESH_TOKEN_NAME)) {
                refreshTokenService.findCurrentUserRefreshTokenAndCompareWith(tokenProvider.resolveToken(request));

                String accessToken = tokenProvider.createAccessToken();
                String refreshToken = tokenProvider.createRefreshToken();

                // Transaction 처리를 위해서 하나의 메서드로 처리
                refreshTokenService.reissueCurrentUserRefreshToken(refreshToken);

                CookieUtils.setCookie(response, ACCESS_TOKEN_NAME, accessToken, ACCESS_TOKEN_EXPIRE_TIME_IN_SECONDS);
                CookieUtils.setCookie(response, REFRESH_TOKEN_NAME, refreshToken, REFRESH_TOKEN_EXPIRE_TIME_IN_SECONDS);

                response.setStatus(200);
                response.getWriter().append("갱신 완료").flush();
            }

        }
        filterChain.doFilter(request, response);
    }
}
