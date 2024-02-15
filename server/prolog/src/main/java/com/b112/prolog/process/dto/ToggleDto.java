package com.b112.prolog.process.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ToggleDto {

    private final boolean isToggled;
    private final String question;
    private final String answer;
    private final boolean previous;

    @Builder
    public ToggleDto(boolean isToggled, String question, String answer, boolean previous) {
        this.isToggled = isToggled;
        this.question = question;
        this.answer = answer;
        this.previous = previous;
    }
}
