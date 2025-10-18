package com.b112.prolog.user.controller;

import com.b112.prolog.user.dto.LoginDto;
import com.b112.prolog.user.dto.Profile;
import com.b112.prolog.user.dto.RegisterDto;
import com.b112.prolog.user.dto.TokenResponseDto;
import com.b112.prolog.user.exception.LoginFailedException;
import com.b112.prolog.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequestMapping("/api/user")
@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestParam String email) {

        return ResponseEntity.ok().body(userService.findCurrentUserByEmail(email));
    }

    @PutMapping("/profile")
    public ResponseEntity<?> editProfile(@RequestBody Profile profile) {
        userService.updateUserInfo(profile);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        return ResponseEntity.ok().body(userService.register(registerDto));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponseDto> login(@RequestBody LoginDto loginDto) throws LoginFailedException {
        return ResponseEntity.ok().body(userService.login(loginDto));
    }

    /**
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
**/
}
