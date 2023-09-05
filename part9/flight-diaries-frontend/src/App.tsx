import ky, { HTTPError } from 'ky';
import { Fragment, useCallback, useEffect, useState } from 'react';
import './App.css';
import type { DiaryEntry, NewDiaryEntry } from './types/DiaryEntry';

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState('');

  const getDiaryEntries = useCallback(async () => {
    try {
      const diaryEntriesResult = await ky
        .get('diaries', {
          prefixUrl: 'http://localhost:3001/api/',
        })
        .json<DiaryEntry[]>();
      setDiaryEntries(diaryEntriesResult);
    } catch (error) {
      if (error instanceof HTTPError) {
        console.error(await error.request.json());
        return;
      }
      console.error('there is unknown error happen. Cause: ', error);
    }
  }, []);

  useEffect(() => {
    getDiaryEntries();
  }, []);

  const onSubmitHandle: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const formData = new FormData(event.currentTarget);
        const dataObject = Object.fromEntries(
          formData.entries()
        ) as NewDiaryEntry;
        const addedEntry = await ky
          .post('diaries', {
            prefixUrl: 'http://localhost:3001/api/',
            json: dataObject,
          })
          .json<DiaryEntry>();
        setDiaryEntries((oldEntries) => ([...oldEntries, addedEntry]))
      } catch (error) {
        if (error instanceof HTTPError){
          const errorResponseText = await error.response.text()
          setError(errorResponseText)
        }
      }
    },
    []
  );
  return (
    <main>
      <h1>Add new entry</h1>
      <form onSubmit={onSubmitHandle}>
        <section>
          <p style={{color: 'red'}}>{error}</p>
        </section>
        <section>
          <label htmlFor="date">date</label>
          <input type="text" name="date" id="date" />
        </section>
        <section>
          <label htmlFor="visibility">visibility</label>
          <input type="text" name="visibility" id="visibility" />
        </section>
        <section>
          <label htmlFor="weather">weather</label>
          <input type="text" name="weather" id="weather" />
        </section>
        <section>
          <label htmlFor="comment">comment</label>
          <input type="text" name="comment" id="comment" />
        </section>
        <section>
          <button type="submit">add</button>
        </section>
      </form>
      <h1>Diary entries</h1>
      {diaryEntries.map((entry) => (
        <Fragment key={entry.id}>
          <h2>{entry.date}</h2>
          <section>visibility: {entry.visibility}</section>
          <section>weather: {entry.weather}</section>
        </Fragment>
      ))}
    </main>
  );
}

export default App;
