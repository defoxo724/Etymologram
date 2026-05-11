import React from 'react'
import InputContainer from './InputContainer';

interface InputSelectProps {
    title: string;
    data: [string, string][];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}


const InputSelect = (props: InputSelectProps) => {
    return (
        <InputContainer title={props.title}>
            <select className="form-select" onChange={props.onChange} value={props.value ?? ""}>
                <option value="">-- None --</option>
                {props.data.map(([visibleValue, idValue]) => (
                    <option key={idValue} value={idValue}>{visibleValue}</option>
                ))}
            </select>
        </InputContainer>
    )
}

export default InputSelect