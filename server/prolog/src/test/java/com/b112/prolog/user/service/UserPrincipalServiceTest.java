package com.b112.prolog.user.service;

import com.b112.prolog.user.entity.CareerType;
import com.b112.prolog.user.entity.RoleType;
import com.b112.prolog.user.entity.User;
import com.b112.prolog.user.entity.UserPrincipal;
import com.b112.prolog.user.exception.UserNotFoundException;
import com.b112.prolog.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.mockito.BDDMockito.given;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@ExtendWith(MockitoExtension.class)
class UserPrincipalServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserPrincipalService userPrincipalService;

    private static String uuid, password, email, nickname, phoneNumber, role;

    @BeforeAll
    static void setUp() {
        uuid = "4579e90d-ffa3-4d93-af85-aadef5f6d176";
        password = "!@swe#$17";
        email = "abcd@gmail.com";
        nickname = "user1";
        phoneNumber = "01012345678";
        role = "MEMBER";
    }

    @Test
    @DisplayName("UUID로 유저 정보 조회")
    void loadUserByUsername() {
        // given
        User user = new User(uuid, password, email, nickname, RoleType.USER, new ArrayList<>(), new ArrayList<>(),
                true, CareerType.GRADUATE, new ArrayList<>(), phoneNumber, LocalDateTime.now());
        when(userRepository.findById(uuid)).thenReturn(Optional.of(user));

        // when
        UserPrincipal userPrincipal = userPrincipalService.loadUserByUsername(uuid);

        // then
        assertThat(userPrincipal).isNotNull();
        assertThat(userPrincipal.getUsername()).isEqualTo(uuid);
        verify(userRepository).findById(uuid);
    }

    @Test
    @DisplayName("UUID에 해당하는 사용자가 존재하지 않으면 UserNotFoundException 발생")
    void loadUserByUsername_userNotFound() {
        // given
        String wrong_uuid = "";
        given(userRepository.findById(uuid)).willReturn(Optional.empty());

        // when
        assertThatThrownBy(() -> userPrincipalService.loadUserByUsername(uuid))
                .isInstanceOf(UserNotFoundException.class);

        // then
        verify(userRepository).findById(uuid);
    }

    @Test
    void updatePassword() {
    }

    @Test
    void loadCurrentUser() {
    }
}