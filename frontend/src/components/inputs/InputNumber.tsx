import React from 'react'
import InputContainer from './InputContainer';


interface InputNumberProps {
    title: string;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputNumber = (props: InputNumberProps) => {
    return (
        <InputContainer title={props.title}>
            <input className="form-control" value={props.value} onChange={props.onChange} type='number' />
        </InputContainer>
    )
}

export default InputNumber