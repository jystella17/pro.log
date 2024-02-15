package com.b112.prolog.user.dto;

import com.b112.prolog.process.entity.Process;
import com.b112.prolog.process.entity.Qna;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
@Builder
public class Profile {
    private String email;
    private String nickname;
    private List<String> wishCompany;
    private List<Process> processes;
    private boolean developer;
    private boolean newbie;
    private List<Qna> qnas;
    private String phoneNumber;
}
