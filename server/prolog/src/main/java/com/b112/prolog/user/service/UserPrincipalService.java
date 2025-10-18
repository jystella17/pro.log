package com.b112.prolog.user.service;

import com.b112.prolog.user.entity.User;
import com.b112.prolog.user.entity.UserPrincipal;
import com.b112.prolog.user.exception.NotAuthenticatedException;
import com.b112.prolog.user.exception.UserNotFoundException;
import com.b112.prolog.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsPasswordService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
public class UserPrincipalService implements UserDetailsService, UserDetailsPasswordService {

    private final UserRepository userRepository;

    public UserPrincipalService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserPrincipal loadUserByUsername(String uuid) throws UsernameNotFoundException {
        return userRepository.findById(uuid).map(this::createUserPrincipal)
                .orElseThrow(UserNotFoundException::new);
    }

    @Override
    public UserDetails updatePassword(UserDetails user, String newPassword) {
        return null;
    }

    private UserPrincipal createUserPrincipal(User user) {
        return UserPrincipal.create(user);
    }

    public UserPrincipal loadCurrentUser() {
        log.info(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        log
                .info(SecurityContextHolder.getContext().getAuthentication().getPrincipal().getClass().toString());
        return (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
