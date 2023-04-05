import { useState } from "react";

export default function DisplayCountry({ countries }) {
  const [countriesShow, setCountriesShow] = useState([]);
  const onCountryButtonHandle = (countryName) => {
    if (countriesShow.includes(countryName)) {
      setCountriesShow(
        countriesShow.filter((currentCountry) => currentCountry !== countryName)
      );
      return;
    }
    setCountriesShow([...countriesShow, countryName]);
  };
  return (
    <>
      {countries.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}
      {countries.length < 10 && countries.length > 1 && (
        <div>
          {countries.map((country) => (
            <div key={country.name.common}>
              <div>
                {country.name.common}
                <button
                  onClick={() => onCountryButtonHandle(country.name.common)}
                >
                  {countriesShow.includes(country.name.common) ? "hide" : "show"}
                </button>
              </div>
              {countriesShow.includes(country.name.common) && (<CountryInfo country={country} />)}
            </div>
          ))}
        </div>
      )}
      {countries.length === 1 && <CountryInfo country={countries[0]} />}
    </>
  );
}

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <div>capital {country.capital[0]}</div>
        <div>area {country.area}</div>
      </div>
      <h2>language:</h2>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} flags`} />
    </div>
  );
};
