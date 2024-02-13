package com.b112.prolog.user.entity;

import com.b112.prolog.process.entity.Process;
import com.b112.prolog.process.entity.Qna;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "users")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class User {
    @Id
    private String id; // OAuth Provider가 제공한 사용자 고유 식별 id
    private String email;
    private String nickname;
    private List<String> wishCompany;
    @DocumentReference
    private List<Process> processes;
    private boolean developer;
    private boolean newbie;
    @DocumentReference
    private List<Qna> qnas;

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
                '}';
    }
}
