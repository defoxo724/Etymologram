package io.github.defoxo724.etymologram_backend.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "languages")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Language {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String shortName;
    private Integer appearanceYear;
    private Integer disappearanceYear;

    @OneToMany(mappedBy = "language")
    @JsonIgnore
    private List<Word> words = new ArrayList<>();
}
