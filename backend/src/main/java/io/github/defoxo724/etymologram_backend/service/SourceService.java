package io.github.defoxo724.etymologram_backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import io.github.defoxo724.etymologram_backend.DTO.SourceDTO;
import io.github.defoxo724.etymologram_backend.DTO.WordDTO;
import io.github.defoxo724.etymologram_backend.mappers.SourceMapper;
import io.github.defoxo724.etymologram_backend.mappers.WordMapper;
import io.github.defoxo724.etymologram_backend.model.Source;
import io.github.defoxo724.etymologram_backend.repository.SourceRepository;

@Service
public class SourceService {
    private final SourceRepository sourceRepository;
    private final SourceMapper sourceMapper;
    private final WordService wordService;
    private final WordMapper wordMapper;

    public SourceService(SourceRepository sourceRepository, SourceMapper sourceMapper, WordService wordService,
            WordMapper wordMapper) {
        this.sourceRepository = sourceRepository;
        this.sourceMapper = sourceMapper;
        this.wordService = wordService;
        this.wordMapper = wordMapper;
    }

    public SourceDTO createSource(SourceDTO source, Long wordId) {

        Source model = sourceMapper.dtoToModel(source);
        WordDTO word = wordService.getWord(wordId);
        model.setWord(wordMapper.dtoToModel(word));
        source.setWordId(wordId);

        return sourceMapper.modelToDTO(sourceRepository.save(model));
    }

    public List<SourceDTO> getAllSources(Long wordId) {
        List<Source> sources = sourceRepository.findByWordId(wordId);
        List<SourceDTO> sourceDTOs = new ArrayList<>();
        for (Source source : sources) {
            sourceDTOs.add(sourceMapper.modelToDTO(source));
        }
        return sourceDTOs;
    }

    public void deleteSource(Long id) {
        sourceRepository.deleteById(id);
    }

}
