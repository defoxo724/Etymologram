package io.github.defoxo724.etymologram_backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import io.github.defoxo724.etymologram_backend.DTO.LanguageDTO;
import io.github.defoxo724.etymologram_backend.DTO.WordDTO;
import io.github.defoxo724.etymologram_backend.mappers.LanguageMapper;
import io.github.defoxo724.etymologram_backend.model.Language;
import io.github.defoxo724.etymologram_backend.repository.LanguageRepository;

@Service
public class LanguageService {
    private final LanguageRepository languageRepository;
    private final LanguageMapper languageMapper;
    private final WordService wordService;

    public LanguageService(LanguageRepository languageRepository, LanguageMapper languageMapper,
            WordService wordService) {
        this.languageRepository = languageRepository;
        this.languageMapper = languageMapper;
        this.wordService = wordService;
    }

    public LanguageDTO createLanguage(LanguageDTO language) {
        Language langModel = languageMapper.dtoToModel(language);
        Language savedLang = languageRepository.save(langModel);
        System.out.println("Utworzono nowy język");
        return languageMapper.modelToDTO(savedLang);
    }

    public List<LanguageDTO> getLanguages() {
        List<Language> languages = languageRepository.findAll();
        List<LanguageDTO> languagesDTO = new ArrayList<>();

        for (Language language : languages) {
            languagesDTO.add(languageMapper.modelToDTO(language));
        }
        return languagesDTO;
    }

    public LanguageDTO getLanguageByWord(Long wordId) {
        Long languageId = languageRepository.findByWordId(wordId).getId();
        Language language = languageRepository.findById(languageId).orElseThrow();
        return languageMapper.modelToDTO(language);
    }

    public LanguageDTO getLanguageById(Long od) {
        Language language = languageRepository.findById(od).orElseThrow();
        return languageMapper.modelToDTO(language);
    }

    public void deleteLanguage(Long id) {
        for (WordDTO word : wordService.getAllWords()) {
            if (word.getLanguageId() == id) {
                word.setLanguageId(null);
                wordService.updateWord(word.getId(), word);
            }
        }

        languageRepository.deleteById(id);
    }

}
