package io.github.defoxo724.etymologram_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import io.github.defoxo724.etymologram_backend.model.Language;
import io.github.defoxo724.etymologram_backend.model.Word;

@Repository
public interface LanguageRepository extends JpaRepository<Language, Long> {
    @Query("SELECT l FROM Language l JOIN l.words w WHERE w.id = :wordId")
    Language findByWordId(@Param("wordId") Long wordId);
}
