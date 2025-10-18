package com.b112.prolog.user.service;

import com.b112.prolog.user.WithMockMvcUser;
import com.b112.prolog.user.entity.RoleType;
import com.b112.prolog.user.entity.UserPrincipal;
import com.b112.prolog.user.jwt.LoginAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

public class WithMockMvcUserSecurityContextFactory implements WithSecurityContextFactory<WithMockMvcUser> {

    @Override
    public SecurityContext createSecurityContext(WithMockMvcUser mockMvcUser) {
        SecurityContext securityContext = SecurityContextHolder.getContext();

        List<GrantedAuthority> authorityList = Collections.singletonList(
                new SimpleGrantedAuthority(RoleType.USER.getCode()));

        UserPrincipal userPrincipal = new UserPrincipal(mockMvcUser.uuid(), mockMvcUser.password(), mockMvcUser.email(),
                mockMvcUser.nickname(), mockMvcUser.phoneNumber(), mockMvcUser.role(), LocalDateTime.now(), authorityList);

        Authentication authentication = new LoginAuthenticationToken(userPrincipal);
        securityContext.setAuthentication(authentication);
        SecurityContextHolder.setContext(securityContext);

        return securityContext;
    }
}
