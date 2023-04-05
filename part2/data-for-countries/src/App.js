import { useEffect, useState } from "react";
import CountriesAPI from "./services/countries";
import DisplayCountry from "./services/DisplayCountry";

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
      <DisplayCountry countries={countriesFilter} />
    </div>
  );
}

export default App;
