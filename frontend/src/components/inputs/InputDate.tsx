import React from 'react'

interface InputDateProps {
    title: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const InputDate = (props: InputDateProps) => {
    const setTodayDate = () => {
        const now = new Date();
        const formatted = now.toISOString().slice(0, 16);
        const event = {
            target: { value: formatted }
        } as React.ChangeEvent<HTMLInputElement>

        props.onChange(event)

    }

    return (
        <div>
            <label className="form-label small fw-bold">{props.title}</label>
            <input type="datetime-local" value={props.value} onChange={props.onChange} />
            <button type="button" onClick={setTodayDate}>Today</button>
        </div>
    )
}

export default InputDate