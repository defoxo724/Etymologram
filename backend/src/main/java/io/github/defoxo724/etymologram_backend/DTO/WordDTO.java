package io.github.defoxo724.etymologram_backend.DTO;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class WordDTO {
    private Long id;
    private String word;
    private String definition;
    private String ipa;
    private Long ancestorId;
    private List<Long> descendantsIds = new ArrayList<>();
    private List<Long> sourcesIds = new ArrayList<>();
    private Long languageId;
}
