import React, { useState } from 'react'


interface ToastProps {
    isActive: boolean
    onClose: () => void
    children: React.ReactNode
};

const Toast = (props: ToastProps) => {
    if (!props.isActive) return null

    return (
        <div>
            <div className="modal fade show d-block" tabIndex={-1} role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" onClick={props.onClose} />
                        </div>
                        <div className="modal-body">
                            {props.children}
                        </div>
                    </div>
                </div >
            </div >
            <div className="modal-backdrop fade show" />
        </div >
    );

}

export default Toast