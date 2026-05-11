import React from "react";
import FormContainer from "../../inputs/FormContainer";
import InputText from "../../inputs/InputText";
import InputNumber from "../../inputs/InputNumber";

interface LanguageUpdateComponentProps {
    languageId: number;
}

const LanguageUpdateComponent = (props: LanguageUpdateComponentProps) => {
    const [name, setName] = React.useState<string>("");
    const [shortName, setShortName] = React.useState<string>("");
    const [appearanceYear, setAppearanceYear] = React.useState<number | null>(null);
    const [disappearanceYear, setDisappearanceYear] = React.useState<number | null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert("Name: " + name + "\nShort name: " + shortName + "\nAppearance year: " + appearanceYear + "\nDisappearance year: " + disappearanceYear);
    };

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
