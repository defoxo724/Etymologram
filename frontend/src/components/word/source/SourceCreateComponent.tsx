import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import type { Source } from "../../../model/Source";
import axios from "axios";
import InputText from "../../inputs/InputText";
import FormContainer from "../../inputs/FormContainer";
import InputDate from "../../inputs/InputDate";
import { showPopup } from "../../../Common";

interface SourceCreateComponentProps {
    wordId: number;
}

const SourceCreateComponent = (props: SourceCreateComponentProps) => {
    const queryClient = useQueryClient();
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [accessDate, setAccessDate] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createSourceMutation.mutate({ name, description, url, accessDate });
    };

    const createSourceMutation = useMutation({
        mutationFn: async (source: Source) => {
            const response = await axios.post("http://localhost:8080/api/sources/create/" + props.wordId, source);
            return response.data as Source;
        },
        onSuccess: () => {
            setName("");
            setDescription("");
            setUrl("");
            setAccessDate("");

            queryClient.invalidateQueries({ queryKey: ["sources"] });
            showPopup("Dodano źródło!");
        },
    });

    return (
        <FormContainer title={"Add new source"} onSubmit={handleSubmit}>
            <InputText title={"Name"} value={name} onChange={(e) => setName(e.target.value)} />
            <InputText title={"Description"} value={description} onChange={(e) => setDescription(e.target.value)} />
            <InputText title={"URL"} value={url} onChange={(e) => setUrl(e.target.value)} />
            <InputDate title={"Access Date"} value={accessDate} onChange={(e) => setAccessDate(e.target.value)} />
        </FormContainer>
    );
};

export default SourceCreateComponent;
