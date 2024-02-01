package com.b112.prolog.process.Dto;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class Template {
    private int template_type;
    private String type_name;
    private List<ObjectId> content;


}
