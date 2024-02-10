package com.b112.prolog.user.service;

import com.b112.prolog.user.entity.User;
import com.b112.prolog.user.exception.UserNotFoundException;
import com.b112.prolog.user.jwt.TokenProvider;
import com.b112.prolog.user.repository.TokenRepository;
import com.b112.prolog.user.repository.UserRepository;
import com.b112.prolog.user.util.AuthenticationUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final TokenProvider tokenProvider;

    // Read
    public User findUserById(String id) {
        return userRepository.findById(id).orElseThrow(UserNotFoundException::new);
    }

    public User findCurrentUser() {
        return findUserById(AuthenticationUtils.getCurrentUserId());
    }

    // Create & Update
    public void saveOrUpdateUser(User user) {
        userRepository.save(user);
    }

    // Delete
    public void deleteUserById(String id) {
        userRepository.deleteById(id);
    }

    public void deleteCurrentUser() {
        deleteUserById(AuthenticationUtils.getCurrentUserId());
    }

}
