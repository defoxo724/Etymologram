import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import type { Language } from "../../../model/Language";
import axios from "axios";
import FormContainer from "../../inputs/FormContainer";
import InputText from "../../inputs/InputText";
import InputNumber from "../../inputs/InputNumber";
import { showPopup } from "../../../Common";

const LanguageCreateComponent = () => {
    const queryClient = useQueryClient();

    const [name, setName] = React.useState<string>("");
    const [shortName, setShortName] = React.useState<string>("");
    const [appearanceYear, setAppearanceYear] = React.useState<number | null>(null);
    const [disappearanceYear, setDisappearanceYear] = React.useState<number | null>(null);

    const createLanguageMutation = useMutation({
        mutationFn: async (language: Language) => {
            const response = await axios.post("http://localhost:8080/api/languages/", language);
            return response.data as Language;
        },
        onSuccess: () => {
            setName("");
            setShortName("");
            setAppearanceYear(null);
            setDisappearanceYear(null);

            queryClient.invalidateQueries({ queryKey: ["languages"] });
            showPopup("Dodano język!");
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createLanguageMutation.mutate({ name, shortName, appearanceYear, disappearanceYear, wordIds: [] });
    };

    return (
        <div>
            <FormContainer onSubmit={handleSubmit} title="Create new language">
                <InputText title={"Name"} value={name} onChange={(e) => setName(e.target.value)} />
                <InputText title={"Short name"} value={shortName} onChange={(e) => setShortName(e.target.value)} />
                <InputNumber title={"Appearance Year"} value={appearanceYear ?? NaN} onChange={(e) => setAppearanceYear(e.target.value ? parseInt(e.target.value) : null)} />
                <InputNumber title={"Disappearance Year"} value={disappearanceYear ?? NaN} onChange={(e) => setDisappearanceYear(e.target.value ? parseInt(e.target.value) : null)} />
            </FormContainer>
        </div>
    );
};

export default LanguageCreateComponent;
