export interface Word {
    id?: number;
    word: string;
    definition: string;
    ipa: string;

    ancestorId: number | null;
    descendantsIds: number[];
    languageId: number | null;
}