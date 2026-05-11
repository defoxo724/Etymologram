package io.github.defoxo724.etymologram_backend.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SourceDTO {
    private Long id;
    private String name;
    private String url;
    private String description;
    private String accessDate;
    private Long wordId;
}
