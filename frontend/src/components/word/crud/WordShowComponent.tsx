import { useState } from "react";
import type { Word } from "../../../model/Word";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Toast from "../../utils/Toast";
import WordUpdateComponent from "./WordUpdateComponent";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface WordShowComponentProps {
    word: Word;
}

const WordShowComponent = (props: WordShowComponentProps) => {
    const queryClient = useQueryClient();

    const deleteWordMutation = useMutation({
        mutationFn: async (word: Word) => {
            const response = await axios.delete("http://localhost:8080/api/words/" + word.id);
            return response.data as Word;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["words"] });
        },
    });

    const {
        data: descendantsData,
        isLoading: descendantsIsLoading,
        isError: descendantsError,
    } = useQuery({
        queryKey: ["descendant", props.word.id],
        queryFn: async () => {
            const response = await fetch(`http://localhost:8080/api/words/${props.word.id}/number-of-descendants`);
            if (!response.ok) throw new Error("Błąd pobierania");
            return response.json();
        },
    });

    const getDescendantsLabel = () => {
        if (descendantsIsLoading) return "Ładowanie...";
        if (descendantsError) return "Błąd";
        return descendantsData;
    };

    const handleDeleteButtonClick = () => {
        deleteWordMutation.mutate(props.word);
    };
    const [toastOpen, setToastOpen] = useState(false);
    return (
        <div>
            <div>
                <button onClick={() => setToastOpen(true)}></button>
                <Toast isActive={toastOpen} onClose={() => setToastOpen(false)}>
                    {props.word.id !== undefined && (
                        <>
                            <WordUpdateComponent wordId={props.word.id} />
                        </>
                    )}
                </Toast>
            </div>
            <div>
                <span className="text-muted fst-italic">#{props.word.id}</span> <span className="fw-bold">{props.word.word}</span>{" "}
                <span>
                    (<span className="fst-italic">{props.word.ipa}</span>)
                </span>{" "}
                - {props.word.definition}
                <span className="badge bg-secondary ms-2">Descendants: {getDescendantsLabel()}</span>
            </div>
            <div>
                <button className="btn btn-warning" onClick={() => setToastOpen(true)}>
                    Edytuj
                </button>
                <button className="btn btn-danger" onClick={handleDeleteButtonClick}>
                    Usuń
                </button>
            </div>
        </div>
    );
};

export default WordShowComponent;
