package com.b112.prolog.user.dto;

import com.b112.prolog.process.entity.Process;
import com.b112.prolog.process.entity.Qna;
import com.b112.prolog.user.entity.CareerType;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class RegisterDto {

    private final String email;
    private final String password;
    private final String nickname;
    private final List<String> wishCompany;
    private final boolean isDeveloper;
    private final String careerType;
    private final String phoneNumber;

    @Builder
    public RegisterDto(String email, String password, String nickname, List<String> wishCompany, boolean isDeveloper,
                       String careerType, String phoneNumber) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.wishCompany = !wishCompany.isEmpty() ? wishCompany : new ArrayList<>();
        this.isDeveloper = isDeveloper;
        this.careerType = !careerType.isEmpty() ? careerType : CareerType.GRADUATE.getCode();
        this.phoneNumber = phoneNumber;
    }
}
