import React from 'react'

interface InputButtonProps {
    text: string
    bootstrapStyle: "danger" | "primary" | "secondary" | "success" | "warning" | "info" | "light" | "dark";
    onClick(): void;
}

const InputButton = (props: InputButtonProps) => {
    return (
        <button onClick={props.onClick} className={"btn btn-$" + props.bootstrapStyle}>{props.text}</button>
    )
}

export default InputButton