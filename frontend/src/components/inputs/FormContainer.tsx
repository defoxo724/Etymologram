import React from 'react'

interface FormContainerProps {
    title: string;
    children: React.ReactNode;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}


const FormContainer = (props: FormContainerProps) => {
    return (
        <div className='bg-light p-3 rounded mb-3'>
            <h2>{props.title}</h2>
            <form onSubmit={props.onSubmit}>
                {props.children}
                <button type="submit" className='btn btn-primary'>Submit</button>
            </form>
        </div >
    )
}

export default FormContainer