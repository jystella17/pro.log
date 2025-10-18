package com.b112.prolog.user;

import com.b112.prolog.user.entity.RoleType;
import com.b112.prolog.user.service.WithMockMvcUserSecurityContextFactory;
import org.springframework.security.test.context.support.WithSecurityContext;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@WithSecurityContext(factory = WithMockMvcUserSecurityContextFactory.class)
public @interface WithMockMvcUser {

    String uuid() default "4579e90d-ffa3-4d93-af85-aadef5f6d176";
    String password() default "!@swe#$17";
    String email() default "abcd@gmail.com";
    String nickname() default "user1";
    String phoneNumber() default "01012345678";
    String role() default "MEMBER";
}
