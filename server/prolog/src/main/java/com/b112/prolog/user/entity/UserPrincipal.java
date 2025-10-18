package com.b112.prolog.user.entity;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Getter
public class UserPrincipal implements UserDetails {

    private final String uuid;
    private final String password;
    private final String email;
    private final String nickname;
    private final String phoneNumber;
    private final String role;
    private final LocalDateTime lastJwtIssuedAt;
    private final Collection<GrantedAuthority> authorities;

    public UserPrincipal(String uuid, String password, String email, String nickname, String phoneNumber,
                         String role, LocalDateTime lastJwtIssuedAt, Collection<GrantedAuthority> authorities) {
        this.uuid = uuid;
        this.password = password;
        this.email = email;
        this.nickname = nickname;
        this.phoneNumber = phoneNumber;
        this.role = role;
        this.lastJwtIssuedAt = lastJwtIssuedAt;
        this.authorities = authorities;
    }

    public static UserPrincipal create(User user) {
        List<GrantedAuthority> authorityList = Collections.singletonList(
                new SimpleGrantedAuthority(user.getRoleType().getCode()));

        return new UserPrincipal(user.getUuid(), user.getPassword(), user.getEmail(), user.getNickname(),
                user.getPhoneNumber(), user.getRoleType().getCode(), user.getLastJwtIssuedAt(), authorityList);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return uuid;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expiry = lastJwtIssuedAt.plusDays(7);

        return now.isBefore(expiry);
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
