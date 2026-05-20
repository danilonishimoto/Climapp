import { useState, useEffect } from "react";
import { getPosition } from "../utils/getPosition";
import { fetchState } from "./fetchState";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const useLocalWeather = (city, setCity) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [coords, setCoords] = useState(null);
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGeolocation = async () => {
      try {
        setLoading(true);
        const geolocation = await getPosition();
        if (geolocation) {
          setCoords(geolocation.coords);
        }
      } catch (err) {
        setError("Não foi possível obter sua localização.");
      } finally {
        setLoading(false);
      }
    };
    loadGeolocation();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!coords && !city) return;

      try {
        setLoading(true);
        let url = `https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY}&city_name=São Paulo`
        if((coords?.latitude && coords?.longitude) && !city) 
          url = `https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY}&lat=${coords.latitude}&lon=${coords.longitude}`;
        else {
          url = `https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY}&city_name=${city}`
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.results) {
          setWeather(data.results);
          setForecast(data.results.forecast.slice(1, 4));
          if (coords) setCity(data.results.city_name);
        }
      } catch (err) {
        setError("Erro ao conectar com o serviço de meteorologia.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [coords, city, setCity]); 

  useEffect(() => {
    if (!city) return;
    const loadState = async () => {
      try {
        const data = await fetchState(city);
        if (data) setState(data);
      } catch (err) {
        console.error("Erro ao buscar estado");
      }
    };
    loadState();
  }, [city]);

  return { weather, forecast, state, loading, error };
};

export default useLocalWeather;