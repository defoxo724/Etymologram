package io.github.defoxo724.etymologram_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.github.defoxo724.etymologram_backend.model.Word;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {

}
