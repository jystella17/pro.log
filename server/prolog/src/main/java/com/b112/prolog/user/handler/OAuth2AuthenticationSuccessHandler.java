package com.b112.prolog.user.handler;

import com.b112.prolog.user.entity.User;
import com.b112.prolog.user.info.OAuth2Provider;
import com.b112.prolog.user.info.OAuth2UserInfo;
import com.b112.prolog.user.info.OAuth2UserPrincipal;
import com.b112.prolog.user.info.OAuth2UserUnlinkManager;
import com.b112.prolog.user.jwt.TokenProvider;
import com.b112.prolog.user.repository.HttpCookieOAuth2AuthorizationRequestRepository;
import com.b112.prolog.user.service.RefreshTokenService;
import com.b112.prolog.user.service.UserService;
import com.b112.prolog.user.util.CookieUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Optional;

import static com.b112.prolog.user.jwt.TokenProvider.*;
import static com.b112.prolog.user.repository.HttpCookieOAuth2AuthorizationRequestRepository.MODE_PARAM_COOKIE_NAME;
import static com.b112.prolog.user.repository.HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;
    private final OAuth2UserUnlinkManager oAuth2UserUnlinkManager;
    private final TokenProvider tokenProvider;
    private final UserService userService;
    private final RefreshTokenService refreshTokenService;


    @Value("${host.client.base-url}")
    private String client;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        setDefaultTargetUrl(client);

        String targetUrl;
        targetUrl = determineTargetUrl(request, response, authentication);

        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }

        clearAuthenticationAttributes(request, response);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    @Override
    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) {
        Optional<String> redirectUri = CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue);

        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());

        String mode = CookieUtils.getCookie(request, MODE_PARAM_COOKIE_NAME)
                .map(Cookie::getValue)
                .orElse(client);

        OAuth2UserPrincipal principal = getOAuth2UserPrincipal(authentication);

        if (principal == null) {
            return UriComponentsBuilder.fromUriString(targetUrl)
                    .queryParam("login", "failure")
                    .build().toUriString();
        }

        if ("login".equalsIgnoreCase(mode)) {
            OAuth2UserInfo userInfo = principal.getUserInfo();
            User user = User.builder()
                    .id(userInfo.getId())
                    .email(userInfo.getEmail())
                    .nickname(userInfo.getNickName())
                    .wishCompany(new ArrayList<>())
                    .processes(new ArrayList<>())
                    .developer(false)
                    .newbie(true)
                    .qnas(new ArrayList<>())
                    .build();

            // 사용자 정보 DB 저장 혹은 업데이트
            userService.saveUser(user);

            log.info("email={}, name={}, nickname={}, accessToken={}", principal.getUserInfo().getEmail(),
                    principal.getUserInfo().getName(),
                    principal.getUserInfo().getNickName(),
                    principal.getUserInfo().getAccessToken()
            );

            String accessToken = tokenProvider.createAccessToken(authentication);
            String refreshToken = tokenProvider.createRefreshToken(authentication);

            //  TODO: log 지우기
            log.info("accessToken={}\nrefreshToken={}", accessToken, refreshToken);

            // 리프레시 토큰을 데이터베이스에 저장
            refreshTokenService.saveRefreshToken(refreshToken);

            // 액세스 토큰, 리프레시 토큰 쿠키에 발급
            CookieUtils.setCookie(response, ACCESS_TOKEN_NAME, accessToken, ACCESS_TOKEN_EXPIRE_TIME_IN_SECONDS);
            CookieUtils.setCookie(response, REFRESH_TOKEN_NAME, refreshToken, REFRESH_TOKEN_EXPIRE_TIME_IN_SECONDS);

            return UriComponentsBuilder.fromUriString(targetUrl)
                    .queryParam("login", "success")
                    .build().toUriString();

        } else if ("unlink".equalsIgnoreCase(mode)) {

            String accessToken = principal.getUserInfo().getAccessToken();
            OAuth2Provider provider = principal.getUserInfo().getProvider();

            // 리프레시 토큰 삭제
            refreshTokenService.deleteCurrentUserRefreshToken();

            // 사용자 정보 삭제
            userService.deleteCurrentUser();

            // OAuth2와 unlink
            oAuth2UserUnlinkManager.unlink(provider, accessToken);

            // 쿠키 삭제
            CookieUtils.deleteCookie(request, response, ACCESS_TOKEN_NAME);
            CookieUtils.deleteCookie(request, response, REFRESH_TOKEN_NAME);

            return UriComponentsBuilder.fromUriString(targetUrl)
                    .build().toUriString();
        }

        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("login", "failure")
                .build().toUriString();
    }

    private OAuth2UserPrincipal getOAuth2UserPrincipal(Authentication authentication) {
        Object principal = authentication.getPrincipal();

        if (principal instanceof OAuth2UserPrincipal) {
            return (OAuth2UserPrincipal) principal;
        }
        return null;
    }

    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
        httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }
}
