import React from 'react'


interface InputContainerProps {
    title: string;
    children: React.ReactNode;
}

const InputContainer = (props: InputContainerProps) => {
    return (
        <div>
            <label className="form-label small fw-bold">{props.title}</label>
            {props.children}
        </div>

    )
}

export default InputContainer