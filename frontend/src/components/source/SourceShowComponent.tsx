import React, { useState } from "react";
import type { Source } from "../../model/Source";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface SourceShowComponentProps {
    source: Source;
}

const SourceShowComponent = (props: SourceShowComponentProps) => {
    const queryClient = useQueryClient();

    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState<Source>({ ...props.source });

    const deleteSource = useMutation({
        mutationFn: async (id: number) => {
            await axios.delete(`http://localhost:8080/api/sources/delete/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sources"] });
        },
    });

    const updateSource = useMutation({
        mutationFn: async (updatedSource: Source) => {
            const response = await axios.put(`http://localhost:8080/api/sources/update`, updatedSource);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sources"] });
            setIsEditing(false);
        },
    });

    const handleSaveClick = () => {
        updateSource.mutate(editData);
    };

    const handleCancelClick = () => {
        setEditData({ ...props.source });
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="card shadow-sm mb-3 border-primary">
                <div className="card-body">
                    <h5 className="mb-3 text-primary">Edytuj źródło</h5>
                    <div className="mb-2">
                        <label className="form-label small fw-bold">Nazwa</label>
                        <input className="form-control form-control-sm" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label className="form-label small fw-bold">Opis</label>
                        <textarea className="form-control form-control-sm" value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label small fw-bold">URL</label>
                        <input className="form-control form-control-sm" value={editData.url || ""} onChange={(e) => setEditData({ ...editData, url: e.target.value })} />
                    </div>
                    <div className="d-flex gap-2">
                        <button className="btn btn-success btn-sm" onClick={handleSaveClick} disabled={updateSource.isPending}>
                            {updateSource.isPending ? "Zapisywanie..." : "Zapisz"}
                        </button>
                        <button className="btn btn-outline-secondary btn-sm" onClick={handleCancelClick}>
                            Anuluj
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card shadow-sm mb-3">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title text-primary mb-0">{props.source.name}</h5>
                    <div className="btn-group btn-group-sm">
                        <button className="btn btn-warning" onClick={() => setIsEditing(true)}>
                            Edytuj
                        </button>
                        <button className="btn btn-danger" onClick={() => deleteSource.mutate(props.source.id!)}>
                            Usuń
                        </button>
                    </div>
                </div>
                <p className="card-text text-muted mb-3">{props.source.description}</p>
                <div className="d-flex flex-column gap-1 border-top pt-2">
                    {props.source.url && (
                        <a href={props.source.url} target="_blank" rel="noopener noreferrer" className="card-link text-decoration-none text-truncate m-0">
                            {props.source.url}
                        </a>
                    )}
                    <small className="text-secondary">
                        <span className="fw-bold">Data dostępu:</span> {props.source.accessDate}
                    </small>
                </div>
            </div>
        </div>
    );
};

export default SourceShowComponent;
