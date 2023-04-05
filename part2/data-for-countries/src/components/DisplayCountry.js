import { useEffect, useState } from "react";
import OpenWeatherAPI from "../services/weather";

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
                  {countriesShow.includes(country.name.common)
                    ? "hide"
                    : "show"}
                </button>
              </div>
              {countriesShow.includes(country.name.common) && (
                <CountryInfo country={country} />
              )}
            </div>
          ))}
        </div>
      )}
      {countries.length === 1 && <CountryInfo country={countries[0]} />}
    </>
  );
}

const CountryInfo = ({ country }) => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  useEffect(() => {
    OpenWeatherAPI.getGeocodingFromCityName(country.capital[0]).then((data) => {
      const latLng = {
        lat: data[0].lat,
        lon: data[0].lon,
      };
      OpenWeatherAPI.getWeatherFromLatLng(latLng).then((weatherData) => {
        setWeatherInfo(weatherData);
      });
    });
  }, [country.capital]);
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
      <h2>Weather in {country.capital[0]}</h2>
      {!weatherInfo && <div>loading...</div>}
      {weatherInfo && (
        <>
          <div>temperature {weatherInfo.main.temp}&deg;C</div>
          <img
            src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@4x.png`}
            alt={`${country.capital[0]} with ${weatherInfo.weather[0].description}`}
          />
          <div>wind {weatherInfo.wind.speed} m/s</div>
        </>
      )}
    </div>
  );
};
