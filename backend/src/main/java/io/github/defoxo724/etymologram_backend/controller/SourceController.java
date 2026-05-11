package io.github.defoxo724.etymologram_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.defoxo724.etymologram_backend.DTO.SourceDTO;
import io.github.defoxo724.etymologram_backend.service.SourceService;

@RestController
@RequestMapping("api/sources")
@CrossOrigin("*")
public class SourceController {
    private final SourceService sourceService;

    public SourceController(SourceService sourceService) {
        this.sourceService = sourceService;
    }

    @PostMapping("/create/{wordId}")
    public ResponseEntity<SourceDTO> createSource(@RequestBody SourceDTO source, @PathVariable Long wordId) {
        return ResponseEntity.ok(sourceService.createSource(source, wordId));
    }

    @GetMapping("/get/{wordId}")
    public ResponseEntity<List<SourceDTO>> getAllSources(@PathVariable Long wordId) {
        return ResponseEntity.ok(sourceService.getAllSources(wordId));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteSource(@PathVariable Long id) {
        sourceService.deleteSource(id);
        return ResponseEntity.noContent().build();
    }

}
