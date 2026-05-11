package io.github.defoxo724.etymologram_backend.DTO;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LanguageDTO {
    private Long id;
    private String name;
    private String shortName;
    private Integer appearanceYear;
    private Integer disappearanceYear;

    private List<Long> wordIds = new ArrayList<>();
}
