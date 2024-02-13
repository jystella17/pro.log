package com.b112.prolog.user.config;

import com.b112.prolog.user.handler.*;
import com.b112.prolog.user.jwt.JwtAuthorizationFilter;
import com.b112.prolog.user.repository.HttpCookieOAuth2AuthorizationRequestRepository;
import com.b112.prolog.user.service.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final JwtAuthorizationFilter jwtAuthorizationFilter;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;
    private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;
    private final CustomLogoutHandler customLogoutHandler;
    private final CustomLogoutSuccessHandler customLogoutSuccessHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .logout(logoutConfigurer -> logoutConfigurer
                        .logoutRequestMatcher(new AntPathRequestMatcher("/api/logout"))
                        .addLogoutHandler(customLogoutHandler)
                        .logoutSuccessHandler(customLogoutSuccessHandler)
                        .deleteCookies("JSESSIONID", "access_token", "refresh_token", "remember-me")
                        .invalidateHttpSession(true)
                        .clearAuthentication(true))
                .oauth2Login(oAuth2LoginConfigurer -> oAuth2LoginConfigurer
                        .authorizationEndpoint(authorization -> authorization
                                .baseUri("/api/oauth2/authorization")
                                .authorizationRequestRepository(httpCookieOAuth2AuthorizationRequestRepository))
                        .userInfoEndpoint(config -> config.userService(customOAuth2UserService))
                        .redirectionEndpoint(redirectionEndpointConfig -> redirectionEndpointConfig.baseUri("/api/login/oauth2/code/*"))
                        .successHandler(oAuth2AuthenticationSuccessHandler)
                        .failureHandler(oAuth2AuthenticationFailureHandler)

                )
                .exceptionHandling(exceptionHandlingConfigurer -> exceptionHandlingConfigurer
                        .authenticationEntryPoint(customAuthenticationEntryPoint)
                        .accessDeniedHandler(customAccessDeniedHandler)
                );

        http.addFilterBefore(jwtAuthorizationFilter, LogoutFilter.class);

        return http.build();
    }
}
