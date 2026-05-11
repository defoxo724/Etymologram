import React from 'react'

interface NavigationContainerProps {
    title: string;
    children: React.ReactNode;
}

const NavigationContainer = (props: NavigationContainerProps) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#e3f2fd' }}>
            <a className="navbar-brand" href="#">{props.title}</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    {props.children}
                </div>
            </div>
        </nav>
    )
}

export default NavigationContainer