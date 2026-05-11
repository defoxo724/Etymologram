import React from "react";
import FormContainer from "../../inputs/FormContainer";
import InputText from "../../inputs/InputText";
import InputNumber from "../../inputs/InputNumber";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Language } from "../../../model/Language";
import { showPopup } from "../../../Common";

interface LanguageUpdateComponentProps {
    languageId: number;
}

const LanguageUpdateComponent = (props: LanguageUpdateComponentProps) => {
    const queryClient = useQueryClient();
    const [name, setName] = React.useState<string>("");
    const [shortName, setShortName] = React.useState<string>("");
    const [appearanceYear, setAppearanceYear] = React.useState<number | null>(null);
    const [disappearanceYear, setDisappearanceYear] = React.useState<number | null>(null);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["language"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:8080/api/languages/" + props.languageId);
            return res.data as Language;
        },
    });

    const mutation = useMutation({
        mutationFn: (data: any) => axios.put("http://localhost:8080/api/languages/" + props.languageId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["language"] });
            queryClient.invalidateQueries({ queryKey: ["languages"] });
            setName("");
            setShortName("");
            setAppearanceYear(null);
            setDisappearanceYear(null);
            showPopup("Zaktualizowano język!");
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutation.mutate({ id: props.languageId, name, shortName, appearanceYear, disappearanceYear });
    };

    React.useEffect(() => {
        if (data) {
            setName(data.name);
            setShortName(data.shortName);
            setAppearanceYear(data.appearanceYear);
            setDisappearanceYear(data.disappearanceYear);
        }
    }, [data]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <div>
            <FormContainer onSubmit={handleSubmit} title={`Edit language: ${props.languageId!}`}>
                <InputText title={"Name"} value={name} onChange={(e) => setName(e.target.value)} />
                <InputText title={"Short name"} value={shortName} onChange={(e) => setShortName(e.target.value)} />
                <InputNumber title={"Appearance Year"} value={appearanceYear ?? NaN} onChange={(e) => setAppearanceYear(e.target.value ? parseInt(e.target.value) : null)} />
                <InputNumber title={"Disappearance Year"} value={disappearanceYear ?? NaN} onChange={(e) => setDisappearanceYear(e.target.value ? parseInt(e.target.value) : null)} />
            </FormContainer>
        </div>
    );
};

export default LanguageUpdateComponent;
