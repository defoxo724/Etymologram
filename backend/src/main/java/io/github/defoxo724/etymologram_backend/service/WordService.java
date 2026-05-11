package io.github.defoxo724.etymologram_backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import io.github.defoxo724.etymologram_backend.DTO.WordDTO;
import io.github.defoxo724.etymologram_backend.mappers.WordMapper;
import io.github.defoxo724.etymologram_backend.model.Language;
import io.github.defoxo724.etymologram_backend.model.Word;
import io.github.defoxo724.etymologram_backend.repository.LanguageRepository;
import io.github.defoxo724.etymologram_backend.repository.WordRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class WordService {
    private final WordRepository wordRepository;
    private final WordMapper wordMapper;
    private final LanguageRepository languageRepository;

    public WordService(WordRepository wordRepository, WordMapper wordMapper, LanguageRepository languageRepository) {
        this.wordRepository = wordRepository;
        this.wordMapper = wordMapper;
        this.languageRepository = languageRepository;
    }

    public List<WordDTO> getAllWords() {
        List<Word> words = wordRepository.findAll();
        List<WordDTO> wordDTOs = new ArrayList<>();
        for (Word word : words) {
            wordDTOs.add(wordMapper.modelToDTO(word));
        }
        return wordDTOs;
    }

    public WordDTO getWord(Long id) {
        Word word = wordRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Word not found"));

        return wordMapper.modelToDTO(word);
    }

    public WordDTO createWord(WordDTO dto) {
        Word word = wordMapper.dtoToModel(dto);
        Word saved = wordRepository.save(word);
        return wordMapper.modelToDTO(saved);
    }

    public WordDTO updateWord(Long id, WordDTO dto) {
        Word word = wordRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Word not found"));

        word.setWord(dto.getWord());
        word.setDefinition(dto.getDefinition());
        word.setIpa(dto.getIpa());

        Long ancestorId = dto.getAncestorId();
        if (ancestorId == null) {
            word.setAncestor(null);
        } else {
            if (ancestorId.equals(word.getId())) {
                throw new IllegalArgumentException("Word cannot be its own ancestor");
            }

            Word ancestor = wordRepository.findById(ancestorId)
                    .orElseThrow(() -> new EntityNotFoundException("Ancestor not found"));

            word.setAncestor(ancestor);
        }

        Long languageId = dto.getLanguageId();
        if (languageId == null) {
            word.setLanguage(null);
        } else {
            Language language = languageRepository.findById(languageId)
                    .orElseThrow(() -> new EntityNotFoundException("Language not found"));

            word.setLanguage(language);
        }

        return wordMapper.modelToDTO(wordRepository.save(word));
    }

    public void deleteWord(Long id) {
        if (!wordRepository.existsById(id)) {
            throw new EntityNotFoundException("Word not found");
        }
        wordRepository.deleteById(id);
    }

    public WordDTO setAncestor(Long wordId, Long ancestorId) {
        Word word = wordRepository.findById(wordId)
                .orElseThrow(() -> new EntityNotFoundException("Word not found"));
        Word ancestor = wordRepository.findById(ancestorId)
                .orElseThrow(() -> new EntityNotFoundException("Ancestor not found"));
        word.setAncestor(ancestor);
        return wordMapper.modelToDTO(wordRepository.save(word));
    }

    public List<WordDTO> getDescendants(Long wordId) {
        Word word = wordRepository.findById(wordId)
                .orElseThrow(() -> new EntityNotFoundException("Word not found"));

        List<WordDTO> descendantDTOs = new ArrayList<>();
        for (Word descendant : word.getDescendants()) {
            descendantDTOs.add(wordMapper.modelToDTO(descendant));
        }
        return descendantDTOs;
    }

    public WordDTO clearAncestor(Long wordId) {
        Word word = wordRepository.findById(wordId)
                .orElseThrow(() -> new EntityNotFoundException("Word not found"));
        word.setAncestor(null);
        return wordMapper.modelToDTO(wordRepository.save(word));
    }

    public WordDTO getAncestor(Long wordId) {
        Word word = wordRepository.findById(wordId)
                .orElseThrow(() -> new EntityNotFoundException("Word not found"));

        if (word.getAncestor() == null) {
            return null;
        }

        return wordMapper.modelToDTO(word.getAncestor());
    }

    public List<WordDTO> getWordsWithoutAncestor() {
        List<WordDTO> toReturn = new ArrayList<>();

        for (Word word : wordRepository.findAll()) {
            if (word.getAncestor() == null) {
                toReturn.add(wordMapper.modelToDTO(word));
            }
        }
        return toReturn;
    }

    public int getNumberOfWordDescendants(int wordId) {
        WordDTO word = getWord((Long.valueOf(wordId)));

        return word.getDescendantsIds().size();
    }
}
