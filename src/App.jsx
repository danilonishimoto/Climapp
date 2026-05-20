import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import LoadingSpinner from "./LoadingSpinner";
import "./App.css";
import { useEffect, useState, useMemo } from "react";
import { fetchState } from "./actions/fetchState";
import { getPosition } from "./utils/getPosition";
import useLocalWeather from "./actions/useLocalWeather";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState('')
  
  const { forecast, weather, loading, error, state} = useLocalWeather(city, setCity)

  const showData = !loading && weather;

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
