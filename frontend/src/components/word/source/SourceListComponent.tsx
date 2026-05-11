import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { use } from 'react'
import type { Source } from '../../../model/Source';
import SourceShowComponent from './SourceShowComponent';





interface SourceListComponentProps {
    wordId: number
}


const SourceListComponent = (props: SourceListComponentProps) => {

    const { data: source } = useQuery({
        queryKey: ['sources'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:8080/api/sources/get/' + props.wordId);
            return response.data as Source[];
        }
    })

    return (
        <div>
            {source?.map((source: Source) => (
                <SourceShowComponent source={source} />
            ))}
        </div>
    )
}

export default SourceListComponent