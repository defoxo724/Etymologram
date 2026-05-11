package io.github.defoxo724.etymologram_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.github.defoxo724.etymologram_backend.model.Source;

@Repository
public interface SourceRepository extends JpaRepository<Source, Long> {
    List<Source> findByWordId(Long wordId);
}
