package com.b112.prolog.user.controller;

import com.b112.prolog.user.dto.Profile;
import com.b112.prolog.user.jwt.TokenProvider;
import com.b112.prolog.user.service.RefreshTokenService;
import com.b112.prolog.user.service.UserService;
import com.b112.prolog.user.util.CookieUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.b112.prolog.user.jwt.TokenProvider.*;

@Slf4j
@AllArgsConstructor
@RequestMapping("/api/user")
@RestController
public class UserController {

    private final UserService userService;
    private final RefreshTokenService refreshTokenService; // 리프레시 토큰 저장, 삭제 등을 처리
    private final TokenProvider tokenProvider; // 토큰 생성, 유효성 검사 등을 처리

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {

        return ResponseEntity.ok().body(userService.findCurrentUser());
//        return ResponseEntity.ok().body(userService.findCurrentUser());
    }

    @PutMapping("/profile")
    public ResponseEntity<?> editProfile(Profile profile) {
//    public ResponseEntity<?> editProfile(@RequestBody HashMap<String, Object> map) {
        userService.updateUserInfo(profile);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/token/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request, HttpServletResponse response) {

        // 일치하지 않으면 RefreshTokenExpiredException throw
        refreshTokenService.findCurrentUserRefreshTokenAndCompareWith(tokenProvider.resolveToken(request));

        String accessToken = tokenProvider.createAccessToken();
        String refreshToken = tokenProvider.createRefreshToken();

        log.info("New Access Token: " + accessToken);
        log.info("New Refresh Token: " + refreshToken);

        // Transaction 처리를 위해서 하나의 메서드로 처리
        refreshTokenService.reissueCurrentUserRefreshToken(refreshToken);

        CookieUtils.setCookie(response, ACCESS_TOKEN_NAME, accessToken, ACCESS_TOKEN_EXPIRE_TIME_IN_SECONDS);
        CookieUtils.setCookie(response, REFRESH_TOKEN_NAME, refreshToken, REFRESH_TOKEN_EXPIRE_TIME_IN_SECONDS);

        return ResponseEntity.ok().build();
    }


}
