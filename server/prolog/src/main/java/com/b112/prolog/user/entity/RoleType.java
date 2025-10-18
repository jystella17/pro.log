package com.b112.prolog.user.entity;

import com.b112.prolog.user.exception.AccessDeniedException;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum RoleType {
    USER("ROLE_USER", "회원"),
    ADMIN("ROLE_ADMIN", "관리자");

    private final String code;
    private final String displayName;

    public static RoleType of(String code) {
        return Arrays.stream(RoleType.values())
                .filter(r -> r.getCode().equals(code))
                .findAny()
                .orElseThrow(AccessDeniedException::new);
    }
}
