import { useEffect, useState } from "react";

//Components
import Hightlights from "./Hightlights";
import WeatherInfo from "./WeatherInfo";

const WeatherContainer = () => {
  // State
  const [units, setUnits] = useState("metric");
  const [weatherData, setWeatherData] = useState(null);
  const [citySearch, setCitySearch] = useState("");
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [searchCurrentPosition, setSearchCurrentPosition] = useState(true);

  // Effect
  useEffect(() => {
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

  useEffect(() => {
    if (!lat || !lon) return;

    if (!searchCurrentPosition) return;

    const handleWeatherData = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=1&units=${units}&appid=${process.env.REACT_APP_API_KEY}`;

        const response = await fetch(url);

        if (!response.ok)
          throw Object.assign({
            status: response.status || 404,
            statusText: response.statusText || "Ocurrio un error inesperado",
          });

        const result = await response.json();
        setWeatherData(result.list[0]);
      } catch (error) {
        console.log(error);
      }
    };

    handleWeatherData();
  }, [lat, lon, units, searchCurrentPosition]);

  useEffect(() => {
    if (!citySearch) return;

    if (searchCurrentPosition) return;

    const handleWeatherData = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=${units}&appid=${process.env.REACT_APP_API_KEY}`;

        const response = await fetch(url);

        if (!response.ok)
          throw Object.assign({
            status: response.status || 404,
            statusText: response.statusText || "Ocurrio un error inesperado",
          });

        const result = await response.json();

        setWeatherData(result);
      } catch (error) {
        console.log(error);
      }
    };

    handleWeatherData();
  }, [citySearch, units, searchCurrentPosition]);

  // Functions
  const handleCitySearch = (city) => {
    setSearchCurrentPosition(false);
    setCitySearch(city);
  };

  return (
    <div className="min-h-screen flex flex-wrap md:flex-nowrap">
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
      />
      <Hightlights
        humidity={weatherData?.main.humidity}
        pressure={weatherData?.main.pressure}
        windDeg={weatherData?.wind.deg}
        windSpeed={weatherData?.wind.speed}
        setUnits={setUnits}
        units={units}
      />
    </div>
  );
};

export default WeatherContainer;
