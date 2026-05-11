import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import React from 'react'
import type { Language } from '../../../model/Language';
import LanguageShowComponent from './LanguageShowComponent';

const LanguageListComponent = () => {
    const { data } = useQuery({
        queryKey: ['languages'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:8080/api/languages/');
            return response.data as Language[];
        }
    })


    return (
        <div>
            {data?.map((language: Language) => (
                <LanguageShowComponent language={language} />
            ))}
        </div>
    )
}

export default LanguageListComponent