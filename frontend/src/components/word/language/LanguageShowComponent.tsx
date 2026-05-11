import React, { useState } from "react";
import type { Language } from "../../../model/Language";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Toast from "../../utils/Toast";
import LanguageUpdateComponent from "./LanguageUpdateComponent";

interface LanguageShowComponentProps {
    language: Language;
}

const LanguageShowComponent = (props: LanguageShowComponentProps) => {
    const queryClient = useQueryClient();
    const deleteWordMutation = useMutation({
        mutationFn: async (language: Language) => {
            await axios.delete("http://localhost:8080/api/languages/" + language.id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["languages"] });
        },
    });

    const handleDelete = () => {
        deleteWordMutation.mutate(props.language);
    };

    const [toastOpen, setToastOpen] = useState(false);

    return (
        <div>
            <div>
                <Toast isActive={toastOpen} onClose={() => setToastOpen(false)}>
                    <LanguageUpdateComponent languageId={props.language.id!} />
                </Toast>
            </div>
            <div>
                <h3>
                    {props.language.name} ({props.language.shortName})
                </h3>
                <p>Appearance Year: {props.language.appearanceYear ?? "N/A"}</p>
                <p>Disappearance Year: {props.language.disappearanceYear ?? "N/A"}</p>
                <div>
                    <button className="btn btn-warning" onClick={() => setToastOpen(true)}>
                        Edytuj
                    </button>
                    <button className="btn btn-danger" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LanguageShowComponent;
