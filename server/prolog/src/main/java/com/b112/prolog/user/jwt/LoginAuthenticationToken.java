package com.b112.prolog.user.jwt;

import com.b112.prolog.user.entity.UserPrincipal;
import lombok.Getter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

@Getter
public class LoginAuthenticationToken extends AbstractAuthenticationToken {

    private final UserPrincipal userPrincipal;

    public LoginAuthenticationToken(UserPrincipal userPrincipal) {
        super(userPrincipal.getAuthorities());

        if (userPrincipal.getAuthorities() != null) {
            this.userPrincipal = userPrincipal;
            this.setAuthenticated(true);
        } else {
            throw new IllegalArgumentException("Cannot pass null or empty values for authority");
        }
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public UserPrincipal getPrincipal() {
        return this.userPrincipal;
    }
}
