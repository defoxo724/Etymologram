import WordShowComponent from './WordShowComponent'
import type { Word } from '../../../model/Word'
import { useQuery, } from '@tanstack/react-query'

const WordListComponent = () => {

    const { data, isLoading, error } = useQuery({
        queryKey: ['words'],
        queryFn: async () => {
            const response = await fetch('http://localhost:8080/api/words/');
            return response.json();
        }
    })
    if (isLoading) return <p>Ładowanie danych...</p>;
    if (error) return <p>Błąd: {(error as Error).message}</p>;


    return (
        <div>
            {data.map((word: Word) => (
                <div key={word.id}>
                    <WordShowComponent word={word} />
                </div>
            ))}
        </div>
    )
}

export default WordListComponent
