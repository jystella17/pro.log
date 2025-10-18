package com.b112.prolog.user.dto;

import com.b112.prolog.process.entity.Process;
import com.b112.prolog.process.entity.Qna;
import com.b112.prolog.user.entity.CareerType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class Profile {

    private String email;
    private String nickname;
    private List<String> wishCompany;
    private List<Process> processes;
    private boolean isDeveloper;
    private String careerType;
    private List<Qna> qnaList;
    private String phoneNumber;
}


