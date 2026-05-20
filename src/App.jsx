import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import LoadingSpinner from "./LoadingSpinner";
import "./App.css";
import { useEffect, useState, useMemo } from "react";
import { fetchState } from "./actions/fetchState";
import { getPosition } from "./utils/getPosition";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("São Paulo");
  const [state, setState] = useState("SP");
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState(null);

  const showData = !loading && weather;

  useEffect(() => {
    async function loadGeolocation() {
      try {
        setLoading(true);
              const geolocation = await getPosition();
      if (geolocation) {
        setCoords(geolocation.coords);
      }
      } catch(error) {}
    };

    loadGeolocation()
  }, []);

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);
        if (coords?.latitude && coords?.longitude) {
          const response = await fetch(
            `https://api.hgbrasil.com/weather?format=json-cors&lat=${coords.latitude}&lon=${coords.longitude}&key=${API_KEY}`,
          );
          const data = await response.json();
          if (data.results) {
            setWeather(data.results);
            const nextDays = data.results.forecast.slice(1, 4);
            setForecast(nextDays);
            setCity(data.results.city_name);
            setLoading(false);
          }
        } else {
          const response = await fetch(
            `https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY}&city_name=${city}`,
          );
          const data = await response.json();
          if (data.results) {
            setWeather(data.results);
            const nextDays = data.results.forecast.slice(1, 4);
            setForecast(nextDays);
            setLoading(false);
          }
        }
      } catch (error) {
        console.log("Erro ao buscar dados da API", error);
      }
    }

    fetchWeather();
  }, [city, coords]);

  useEffect(() => {
    async function loadState() {
      try {
        setLoading(true);
        const data = await fetchState(city);
        if (data) {
          setState(data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }

    loadState();
  }, [city]);

  return (
    <div className="app-container">
      <SearchBar setCity={setCity} />
      {showData ? (
        <>
          <h1>
            {city}, {state}
          </h1>
          <WeatherCard weather={weather} />
          <div className="forecast-container">
            <ForecastCard weather={forecast[0]} weekday={"Amanhã"} />
            {forecast.length > 2 ? (
              <ForecastCard weather={forecast[1]} />
            ) : (
              <></>
            )}
            {forecast.length > 3 ? (
              <ForecastCard weather={forecast[2]} />
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default App;
