export const WeatherData = ['rainy', 'sunny', 'windy', 'cloudy'] as const;
export const VisibilityData = ['great' , 'good' , 'ok' , 'poor'] as const

type Weather = typeof WeatherData[number]
type Visibility = typeof VisibilityData[number]
export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;
