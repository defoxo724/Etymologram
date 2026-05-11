package io.github.defoxo724.etymologram_backend.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "words")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Word {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String word;
    private String definition;
    private String ipa;

    @ManyToOne
    @JoinColumn(name = "ancestor_id")
    private Word ancestor;

    @OneToMany(mappedBy = "ancestor")
    @JsonIgnore
    private List<Word> descendants = new ArrayList<>();

    @OneToMany(mappedBy = "word", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Source> sources = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "language_id")
    private Language language;

}