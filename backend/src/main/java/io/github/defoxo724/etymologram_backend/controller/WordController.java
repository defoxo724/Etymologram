package io.github.defoxo724.etymologram_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.defoxo724.etymologram_backend.DTO.WordDTO;
import io.github.defoxo724.etymologram_backend.model.Word;
import io.github.defoxo724.etymologram_backend.service.WordService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("api/words")
@CrossOrigin("*")
public class WordController {
    private final WordService wordService;

    public WordController(WordService wordService) {
        this.wordService = wordService;
    }

    @GetMapping("/")
    public ResponseEntity<List<WordDTO>> getAllWords() {
        return ResponseEntity.ok(wordService.getAllWords());
    }

    @GetMapping("/{id}")
    public ResponseEntity<WordDTO> getWord(@PathVariable Long id) {
        return ResponseEntity.ok(wordService.getWord(id));
    }

    @PostMapping("/")
    public ResponseEntity<WordDTO> createWord(@RequestBody WordDTO word) {
        return ResponseEntity.ok(wordService.createWord(word));
    }

    @PutMapping("/{id}")
    public ResponseEntity<WordDTO> updateWord(@RequestBody WordDTO word, @PathVariable Long id) {
        System.out.println("\n\n\n\n\n\n\n\n\n\n");
        System.out.println(word);
        System.out.println("\n\n\n\n\n\n\n\n\n\n");
        try {
            WordDTO updated = wordService.updateWord(id, word);
            return ResponseEntity.ok(updated);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWord(@PathVariable Long id) {
        try {
            wordService.deleteWord(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{wordId}/ancestor/{ancestorId}")
    public ResponseEntity<WordDTO> setAncestor(@PathVariable Long wordId, @PathVariable Long ancestorId) {
        WordDTO updated = wordService.setAncestor(wordId, ancestorId);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/{wordId}/descendants")
    public ResponseEntity<List<WordDTO>> getDescendants(@PathVariable Long wordId) {
        try {
            return ResponseEntity.ok(wordService.getDescendants(wordId));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{wordId}/ancestor/clear")
    public ResponseEntity<WordDTO> clearAncestor(@PathVariable Long wordId) {
        try {
            WordDTO updated = wordService.clearAncestor(wordId);
            return ResponseEntity.ok(updated);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{wordId}/ancestor")
    public ResponseEntity<WordDTO> getAncestor(@PathVariable Long wordId) {
        try {
            WordDTO ancestor = wordService.getAncestor(wordId);
            return ResponseEntity.ok(ancestor);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/without-ancestor")
    public ResponseEntity<List<WordDTO>> getWordsWithoutAncestor() {
        return ResponseEntity.ok(wordService.getWordsWithoutAncestor());
    }

    @GetMapping("/{id}/number-of-descendants")
    public ResponseEntity<Integer> getMethodName(@PathVariable int id) {
        return ResponseEntity.ok(wordService.getNumberOfWordDescendants(id));
    }

}
