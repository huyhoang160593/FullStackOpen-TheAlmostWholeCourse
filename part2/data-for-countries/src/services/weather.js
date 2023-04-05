import axios from "axios";

const BASE_URL = 'http://api.openweathermap.org'

const getGeocodingFromCityName = (cityName) => {
  const apiURL = new URL(`${BASE_URL}/geo/1.0/direct`)
  apiURL.searchParams.set('q', cityName)
  apiURL.searchParams.set('limit', 1)
  apiURL.searchParams.set('appid', process.env.REACT_APP_API_KEY)
  return axios.get(apiURL).then(response => response.data)
}

const getWeatherFromLatLng = (latLng) => {
  const apiURL = new URL(`${BASE_URL}/data/2.5/weather`)
  apiURL.searchParams.set('lat', latLng.lat)
  apiURL.searchParams.set('lon', latLng.lon)
  apiURL.searchParams.set('appid', process.env.REACT_APP_API_KEY)
  apiURL.searchParams.set('units', 'metric')
  return axios.get(apiURL).then(response => response.data)
}

const OpenWeatherAPI = {
  getGeocodingFromCityName,
  getWeatherFromLatLng
}

export default OpenWeatherAPI