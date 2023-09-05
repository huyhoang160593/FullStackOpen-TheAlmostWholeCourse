export interface DiaryEntry {
    id:         number;
    date:       string;
    weather:    'rainy' | 'sunny' | 'windy' | 'cloudy';
    visibility: 'poor' | 'good';
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>