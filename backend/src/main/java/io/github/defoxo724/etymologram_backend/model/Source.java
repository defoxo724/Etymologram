package io.github.defoxo724.etymologram_backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "sources")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Source {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String description;
    private String url;
    private LocalDateTime accessDate;

    @ManyToOne
    @JoinColumn(name = "word_id", nullable = false)
    private Word word;
}
