import axios from "axios";

const BASE_URL = "https://restcountries.com/v3.1"

const getAllCountries = () => {
  return axios.get(`${BASE_URL}/all`).then(response => response.data)
}

const getCountriesByName = (name) => {
  return axios.get(`${BASE_URL}/name/${name}`)
}

const CountriesAPI = {
  getAllCountries,
  getCountriesByName
}

export default CountriesAPI