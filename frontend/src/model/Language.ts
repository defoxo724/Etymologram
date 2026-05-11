export interface Language {
    id?: number;
    name: string;
    shortName: string;
    appearanceYear: number | null;
    disappearanceYear: number | null;

    wordIds: number[];

}