package io.github.defoxo724.etymologram_backend.mappers;

import org.springframework.stereotype.Component;

import io.github.defoxo724.etymologram_backend.DTO.SourceDTO;
import io.github.defoxo724.etymologram_backend.model.Source;
import java.time.LocalDateTime;

@Component
public class SourceMapper {
    public SourceDTO modelToDTO(Source source) {
        SourceDTO sourceDTO = new SourceDTO();
        sourceDTO.setId(source.getId());
        sourceDTO.setName(source.getName());
        sourceDTO.setUrl(source.getUrl());
        sourceDTO.setDescription(source.getDescription());
        sourceDTO.setAccessDate(source.getAccessDate().toString());
        sourceDTO.setWordId(source.getWord().getId());
        return sourceDTO;
    }

    public Source dtoToModel(SourceDTO sourceDTO) {
        Source source = new Source();
        source.setId(sourceDTO.getId());
        source.setName(sourceDTO.getName());
        source.setUrl(sourceDTO.getUrl());
        source.setDescription(sourceDTO.getDescription());
        source.setAccessDate(LocalDateTime.parse(sourceDTO.getAccessDate()));
        return source;
    }
}
