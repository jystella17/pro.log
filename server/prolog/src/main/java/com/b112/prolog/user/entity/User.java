package com.b112.prolog.user.entity;

import com.b112.prolog.process.entity.Process;
import com.b112.prolog.process.entity.Qna;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Document(collection = "users")
@Getter
public class User {
    @Id
    private final String uuid;
    private final String password;
    private final String email;
    private final String nickname;
    private final RoleType roleType;
    private final List<String> wishCompany;
    @DBRef
    private final List<Process> processes;
    private final boolean isDeveloper;
    private final CareerType careerType;
    @DBRef
    private final List<Qna> qnaList;
    private final String phoneNumber;
    private final LocalDateTime lastJwtIssuedAt;

    @Builder
    public User(String uuid, String password, String email, String nickname, RoleType roleType,
                List<String> wishCompany, List<Process> processes, boolean isDeveloper, CareerType careerType,
                List<Qna> qnaList, String phoneNumber, LocalDateTime lastJwtIssuedAt) {
        this.uuid = uuid;
        this.password = password;
        this.email = email;
        this.nickname = nickname;
        this.roleType = roleType;
        this.wishCompany = wishCompany;
        this.processes = processes;
        this.isDeveloper = isDeveloper;
        this.careerType = careerType;
        this.qnaList = qnaList;
        this.phoneNumber = phoneNumber;
        this.lastJwtIssuedAt = lastJwtIssuedAt != null ? lastJwtIssuedAt : LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + uuid + '\'' +
                ", email='" + email + '\'' +
                ", nickname='" + nickname + '\'' +
                ", roleType=" + roleType.getCode() + '\'' +
                ", wishCompany=" + wishCompany +
                ", processes=" + processes +
                ", isDeveloper=" + isDeveloper +
                ", newbie=" + careerType.getCode() +
                ", qnaList=" + qnaList +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", lastJwtIssuedAt='" + lastJwtIssuedAt + '\'' +
                '}';
    }
}
