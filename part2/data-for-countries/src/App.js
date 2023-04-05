import { useEffect, useState } from "react";
import CountriesAPI from "./services/countries";

function App() {
  const [filterCountriesInput, setFilterCountriesInput] = useState("");
  const [countries, setCountries] = useState([]);
  const countriesFilter = countries.filter((country) => {
    if (!filterCountriesInput) return true;
    return country.name.common
      .toLowerCase()
      .includes(filterCountriesInput.toLowerCase());
  });
  const onSetFilterHandle = (event) => {
    setFilterCountriesInput(event.target.value);
  };
  useEffect(() => {
    CountriesAPI.getAllCountries().then((data) => {
      setCountries(data);
    });
  }, []);
  return (
    <div className="App">
      <div>
        find countries{" "}
        <input value={filterCountriesInput} onChange={onSetFilterHandle} />
      </div>
      {countriesFilter.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}
      {countriesFilter.length < 10 && countriesFilter.length > 1 && (
        <div>
          {countriesFilter.map((country) => (
            <div key={country.name.common}>{country.name.common}</div>
          ))}
        </div>
      )}
      {countriesFilter.length === 1 && (
        <div>
          <h1>{countriesFilter[0].name.common}</h1>
          <div>
            <div>capital {countriesFilter[0].capital[0]}</div>
            <div>area {countriesFilter[0].area}</div>
          </div>
          <h2>language:</h2>
          <ul>
            {Object.values(countriesFilter[0].languages).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img src={countriesFilter[0].flags.png} alt={`${countriesFilter[0].name.common} flags`} />
        </div>
      )}
    </div>
  );
}

export default App;
