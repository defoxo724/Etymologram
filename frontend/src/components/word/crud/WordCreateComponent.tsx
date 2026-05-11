import React from 'react'
import type { Word } from '../../../model/Word';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import InputText from '../../inputs/InputText';
import FormContainer from '../../inputs/FormContainer';


const WordCreateComponent = () => {
    const queryClient = useQueryClient();

    const [word, setWord] = React.useState<string>('');
    const [definition, setDefinition] = React.useState<string>('');
    const [ipa, setIpa] = React.useState<string>('');

    const createWordMutation = useMutation({
        mutationFn: async (word: Word) => {
            const response = await axios.post('http://localhost:8080/api/words/', word);
            return response.data as Word;
        }, onSuccess: () => {
            setWord('');
            setDefinition('');
            setIpa('');

            queryClient.invalidateQueries({ queryKey: ['words'] });
        }
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        createWordMutation.mutate({
            word, definition, ipa,
            ancestorId: null,
            descendantsIds: [],
            languageId: null
        });
    }


    return (
        <div>
            <FormContainer title={'Create new word'} onSubmit={handleSubmit}>
                <InputText title={'Word'} value={word} onChange={(e) => setWord(e.target.value)} />
                <InputText title={'Definition'} value={definition} onChange={(e) => setDefinition(e.target.value)} />
                <InputText title={'IPA'} value={ipa} onChange={(e) => setIpa(e.target.value)} />
            </FormContainer>
        </div>
    )
}

export default WordCreateComponent