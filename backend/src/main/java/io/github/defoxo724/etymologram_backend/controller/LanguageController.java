package io.github.defoxo724.etymologram_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.github.defoxo724.etymologram_backend.DTO.LanguageDTO;
import io.github.defoxo724.etymologram_backend.service.LanguageService;

@RestController
@RequestMapping("api/languages")
@CrossOrigin("*")
public class LanguageController {
    private final LanguageService languageService;

    public LanguageController(LanguageService languageService) {
        this.languageService = languageService;
    }

    @PostMapping("/")
    public ResponseEntity<LanguageDTO> createLanguage(@RequestBody LanguageDTO dto) {
        return ResponseEntity.ok(languageService.createLanguage(dto));
    }

    @GetMapping("/")
    public ResponseEntity<java.util.List<LanguageDTO>> getLanguages() {
        return ResponseEntity.ok(languageService.getLanguages());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLanguage(@PathVariable Long id) {
        languageService.deleteLanguage(id);
        return ResponseEntity.ok().build();
    }
}
