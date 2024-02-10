package com.b112.prolog.user.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Builder

public class User {
    @Id
    private String id; // OAuth Provider가 제공한 사용자 고유 식별 id
    private String email;
    private String nickname;

}
