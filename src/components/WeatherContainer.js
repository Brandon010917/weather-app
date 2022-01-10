import { useEffect, useState } from "react";

//Components
import Hightlights from "./Hightlights/Hightlights";
import WeatherInfo from "./WeatherInfo/WeatherInfo";
import Loader from "./Loader";

const WeatherContainer = () => {
  // State
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [citySearch, setCitySearch] = useState("");
  const [units, setUnits] = useState("metric");
  const [searchCurrentPosition, setSearchCurrentPosition] = useState(true);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  const API_KEY = "111f122b0d0b10e5d383ace3828cc195";

  //Effect para obtener la latitud y longitud apenas carga la pagina
  useEffect(() => {
    setLoader(true);

    if ("geolocation" in navigator) {
      const geo_success = ({ coords }) => {
        const { latitude, longitude } = coords;
        setLat(latitude);
        setLon(longitude);
      };

      const geo_error = (error) => {
        console.log(error);
      };

      navigator.geolocation.getCurrentPosition(geo_success, geo_error);
    } else {
      alert("La geolocalización NO está disponible");
    }
  }, []);

  //Effect para hacer una peticion cada vez que la latitud y longitud cambia
  useEffect(() => {
    if (!lat || !lon) return;

    if (!searchCurrentPosition) return;

    const handleWeatherData = async () => {
      setLoader(true);
      setError(null);
      setWeatherData(null);

      try {
        const url = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=1&units=${units}&appid=${API_KEY}`;

        const response = await fetch(url);

        if (!response.ok)
          throw Object.assign({
            status: response.status || 404,
            statusText: response.statusText || "Ocurrio un error inesperado",
          });

        const result = await response.json();
        setWeatherData(result.list[0]);
      } catch (error) {
        setError(error);
      } finally {
        setTimeout(() => {
          setLoader(false);
        }, 3000);
      }
    };

    handleWeatherData();
  }, [lat, lon, units, searchCurrentPosition]);

  //Effect para hacer una peticion por nombre de una ciudad
  useEffect(() => {
    if (!citySearch) return;

    if (searchCurrentPosition) return;

    const handleWeatherData = async () => {
      setLoader(true);
      setError(null);
      setWeatherData(null);

      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=${units}&appid=${API_KEY}`;

        const response = await fetch(url);

        if (!response.ok)
          throw Object.assign({
            status: response.status || 404,
            statusText: response.statusText || "Ocurrio un error inesperado",
          });

        const result = await response.json();

        setError(null);
        setWeatherData(result);
      } catch (error) {
        setWeatherData(null);
        setError(error);
      } finally {
        setTimeout(() => {
          setLoader(false);
        }, 3000);
      }
    };

    handleWeatherData();
  }, [citySearch, units, searchCurrentPosition]);

  // Functions
  const handleCitySearch = (city) => {
    setLoader(true);
    setSearchCurrentPosition(false);
    setCitySearch(city);
  };

  return (
    <div className="min-h-screen flex flex-wrap md:flex-nowrap">
      {loader ? (
        <Loader loader={loader} />
      ) : (
        <>
          <WeatherInfo
            name={weatherData?.name}
            country={weatherData?.sys.country}
            temp={weatherData?.main.temp}
            main={weatherData?.weather[0].main}
            description={weatherData?.weather[0].description}
            icon={weatherData?.weather[0].icon}
            units={units}
            handleCitySearch={handleCitySearch}
            setSearchCurrentPosition={setSearchCurrentPosition}
            error={error}
            citySearch={citySearch}
          />
          <Hightlights
            humidity={weatherData?.main.humidity}
            pressure={weatherData?.main.pressure}
            windDeg={weatherData?.wind.deg}
            windSpeed={weatherData?.wind.speed}
            setUnits={setUnits}
            units={units}
          />
        </>
      )}
    </div>
  );
};

export default WeatherContainer;
