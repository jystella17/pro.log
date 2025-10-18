package com.b112.prolog.common.entity;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class BaseEntity {

    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public BaseEntity(LocalDateTime createdAt, LocalDateTime modifiedAt) {
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }
}
