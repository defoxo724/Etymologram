import React, { useContext, useEffect, useState } from "react";
import type { Word } from "../../../model/Word";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import SourceCreateComponent from "../source/SourceCreateComponent";
import SourceListComponent from "../source/SourceListComponent";
import type { Language } from "../../../model/Language";
import InputText from "../../inputs/InputText";
import InputSelect from "../../inputs/InputSelect";
import FormContainer from "../../inputs/FormContainer";
import Swal from 'sweetalert2'


interface WordUpdateComponentProps {
    wordId: number
}

const WordUpdateComponent = (props: WordUpdateComponentProps) => {
    const queryClient = useQueryClient();

    // Główny useState edytowanego słowa
    const [word, setWord] = useState<Word | undefined>({
        id: 0,
        word: "",
        definition: "",
        ipa: "",
        ancestorId: 0,
        descendantsIds: [],
        languageId: 0,
    });

    // Pobieranie z API wszystkich słów
    const { data: allWords } = useQuery<Word[]>({
        queryKey: ["words"],
        queryFn: async () => {
            const { data } = await axios.get(
                `http://localhost:8080/api/words/`
            );
            return data;
        },
    });

    // Pobieranie z API wszystkich języków
    const { data: languages } = useQuery<Language[]>({
        queryKey: ["languages"],
        queryFn: async () => {
            const { data } = await axios.get(
                `http://localhost:8080/api/languages/`
            );
            return data;
        },
    });

    // Aktualizacja na bieżąco word w słowie z formularza 
    const handleWordWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        setWord(prevWord => prevWord ? { ...prevWord, word: v } : prevWord);
    }

    // Aktualizacja na bieżąco definition w słowie z formularza 
    const handleWordDefinitionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        setWord(prevWord => prevWord ? { ...prevWord, definition: v } : prevWord);
    }

    // Aktualizacja na bieżąco ipa w słowie z formularza 
    const handleWordIpaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        setWord(prevWord => prevWord ? { ...prevWord, ipa: v } : prevWord);
    }

    // Zmiana useState ancestorId z wyboru z select 
    const handleWordAncestorSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const v = e.target.value;

        setWord(prevWord => prevWord ? { ...prevWord, ancestorId: v === "" ? null : Number(v) } : prevWord);
    };
    // Zmiana useState languageId z wyboru z select 
    const handleWordLanguageSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const v = e.target.value;
        setWord(prevWord => prevWord ? { ...prevWord, languageId: v === "" ? null : Number(v) } : prevWord);
    }


    // Aktualizacja słowa. Zmienna w URL to id aktualnie edytowanego słowa(NIE ZMIENIAĆ). 
    // updatedWord to useState ze słowem 
    const updateMutation = useMutation({
        mutationFn: async (updatedWord: Word) => {
            await axios.put(
                `http://localhost:8080/api/words/${updatedWord.id}`,
                updatedWord
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["words"] });
            queryClient.invalidateQueries({ queryKey: ["word", props.wordId] });
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Zapisano słowo",
                showConfirmButton: false,
                timer: 500
            });
        }
    });

    // Po naciśnięciu "zapisz"
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateMutation.mutate(word!);
    };



    // Ustawienie słowa w useState po załadowaniu słowa z API 
    useEffect(() => {
        let word = allWords!.find(w => w.id === props.wordId) ?? null;
        setWord(word!);
    }, [allWords]);

    if (!allWords) return <p>Ładowanie danych...</p>;
    if (word === undefined) return <p>Fatal error</p>;
    return (
        <>
            <FormContainer title={'Edit word'} onSubmit={handleSubmit}>

                <InputText title={"Word"} value={word.word} onChange={handleWordWordChange} />
                <InputText title={"Definition"} value={word.definition} onChange={handleWordDefinitionChange} />
                <InputText title={"IPA"} value={word.ipa} onChange={handleWordIpaChange} />

                <InputSelect
                    title={"Ancestor"}
                    data={allWords.filter(w => w.id !== props.wordId).map(w => [w.word, String(w.id)])}
                    value={String(word.ancestorId) ?? ""}
                    onChange={handleWordAncestorSelectChange}
                />

                <InputSelect
                    title={"Language"}
                    data={languages?.map(l => [l.name, String(l.id)]) ?? []}
                    value={String(word?.languageId || "")}
                    onChange={handleWordLanguageSelectChange}
                />

            </FormContainer>
            <SourceCreateComponent wordId={props.wordId} />
            <SourceListComponent wordId={props.wordId} />

        </>
    );
};

export default WordUpdateComponent;
