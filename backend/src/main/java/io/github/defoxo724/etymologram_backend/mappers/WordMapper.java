package io.github.defoxo724.etymologram_backend.mappers;

import org.springframework.stereotype.Component;

import io.github.defoxo724.etymologram_backend.DTO.WordDTO;
import io.github.defoxo724.etymologram_backend.model.Word;
import io.github.defoxo724.etymologram_backend.repository.LanguageRepository;

@Component
public class WordMapper {

    private final LanguageRepository languageRepository;

    public WordMapper(LanguageRepository languageRepository) {
        this.languageRepository = languageRepository;
    }

    public WordDTO modelToDTO(Word word) {
        WordDTO wordDTO = new WordDTO();
        wordDTO.setId(word.getId());
        wordDTO.setWord(word.getWord());
        wordDTO.setDefinition(word.getDefinition());
        wordDTO.setIpa(word.getIpa());

        if (word.getAncestor() != null) {
            wordDTO.setAncestorId(word.getAncestor().getId());
        } else {
            wordDTO.setAncestorId(null);
        }

        word.getDescendants().forEach(descendant -> {
            wordDTO.getDescendantsIds().add(descendant.getId());
        });

        word.getSources().forEach(source -> {
            wordDTO.getSourcesIds().add(source.getId());
        });

        if (word.getLanguage() != null) {
            wordDTO.setLanguageId(word.getLanguage().getId());
        } else {
            wordDTO.setLanguageId(null);
        }

        return wordDTO;

    }

    public Word dtoToModel(WordDTO wordDTO) {
        Word word = new Word();
        word.setId(wordDTO.getId());
        word.setWord(wordDTO.getWord());
        word.setDefinition(wordDTO.getDefinition());
        word.setIpa(wordDTO.getIpa());
        if (wordDTO.getLanguageId() != null) {
            word.setLanguage(languageRepository.findById(wordDTO.getLanguageId()).orElse(null));
        }
        return word;
    }
}
