package com.b112.prolog.user.entity;

import com.b112.prolog.process.entity.Process;
import com.b112.prolog.process.entity.Qna;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "users")
@Getter
@Builder
public class User {
    @Id
    private String id; // OAuth Provider가 제공한 사용자 고유 식별 id
    private String email;
    private String nickname;
    private List<String> wishCompany;
    @DBRef
    private List<Process> processes;
    private boolean developer;
    private boolean newbie;
    @DBRef
    private List<Qna> qnas;

    private String phoneNumber;

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", email='" + email + '\'' +
                ", nickname='" + nickname + '\'' +
                ", wishCompany=" + wishCompany +
                ", processes=" + processes +
                ", developer=" + developer +
                ", newbie=" + newbie +
                ", qnas=" + qnas +
                ", phoneNumber='" + phoneNumber + '\'' +
                '}';
    }
}
