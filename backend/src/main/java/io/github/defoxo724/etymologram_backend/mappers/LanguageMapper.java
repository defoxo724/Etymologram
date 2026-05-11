package io.github.defoxo724.etymologram_backend.mappers;

import org.springframework.stereotype.Component;

import io.github.defoxo724.etymologram_backend.DTO.LanguageDTO;
import io.github.defoxo724.etymologram_backend.model.Language;
import io.github.defoxo724.etymologram_backend.model.Word;

@Component
public class LanguageMapper {

    public LanguageDTO modelToDTO(Language language) {
        LanguageDTO dto = new LanguageDTO();
        dto.setId(language.getId());
        dto.setName(language.getName());
        dto.setShortName(language.getShortName());
        dto.setAppearanceYear(language.getAppearanceYear());
        dto.setDisappearanceYear(language.getDisappearanceYear());

        dto.setWordIds(
                language.getWords()
                        .stream()
                        .map(Word::getId)
                        .toList());
        return dto;
    }

    public Language dtoToModel(LanguageDTO dto) {
        Language language = new Language();
        language.setId(dto.getId());
        language.setName(dto.getName());
        language.setShortName(dto.getShortName());
        language.setAppearanceYear(dto.getAppearanceYear());
        language.setDisappearanceYear(dto.getDisappearanceYear());
        return language;
    }
}