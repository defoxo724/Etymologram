import React from 'react'
import InputContainer from './InputContainer';


interface InputTextProps {
    title: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText = (props: InputTextProps) => {
    return (
        <InputContainer title={props.title}>
            <input className="form-control" value={props.value} onChange={props.onChange} />
        </InputContainer>
    )
}

export default InputText