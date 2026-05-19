import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import "./App.css"
import { useEffect, useState, useMemo } from "react";
import { fetchState } from "./actions/fetchState";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([])
  const [city, setCity] = useState("São Paulo");
  const [state, setState] = useState("SP");

  useEffect(() => {
    async function loadState() {
      try {
        const data = await fetchState(city);
        if (data) {
          setState(data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    loadState();
  }, [city]);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch(
          `https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY}&city_name=${city}`,
        );
        const data = await response.json();
        if (data.results) {
          console.log(data.results)
          setWeather(data.results);
          const nextDays = data.results.forecast.slice(1, 4);
          setForecast(nextDays) 
        }
      } catch (error) {
        console.log("Erro ao buscar dados da API", error);
      }
    }

    fetchWeather();
  }, [city]);

  return (
    <div className="app-container">
      <SearchBar />
      {weather && (
        <>
          <h1>
            {city}, {state}
          </h1>
          <WeatherCard weather={weather} />
          <div className="forecast-container">
            <ForecastCard weather={forecast[0]} date={'Amanhã'}/>
            {forecast.length > 2 ? <ForecastCard weather={forecast[1]}/> : <></>}
            {forecast.length > 3 ? <ForecastCard weather={forecast[2]}/> : <></>}
          </div>
          <button onClick={() => setCity('Rio de Janeiro')}>Teste</button>
        </>
      )}
    </div>
  );
}

export default App;
