import { useState } from "react";

// Components
import WeatherHeader from "./WeatherHeader";
import SearchPlace from "./SearchPlace";

//Icons
import { MdLocationOn } from "react-icons/md";

const WeatherInfo = ({
  name,
  country,
  temp,
  main,
  description,
  icon,
  units,
  handleCitySearch,
  setSearchCurrentPosition,
}) => {
  // State
  const [searchPlace, setSearchPlace] = useState(false);

  // Get Time
  const time = new Date().toDateString();
  const date = time.slice(8, 10);
  const day = time.slice(0, 3);
  const month = time.slice(4, 7);

  // Function
  const handleSearchPlace = () => {
    setSearchPlace(!searchPlace);
  };

  return (
    <div className="weather-info weather-info-bg w-full bg-blue-dark">
      {searchPlace && (
        <SearchPlace
          handleSearchPlace={handleSearchPlace}
          handleCitySearch={handleCitySearch}
        />
      )}

      <div className="py-4 px-3 md:p-11">
        <WeatherHeader
          handleSearchPlace={handleSearchPlace}
          setSearchCurrentPosition={setSearchCurrentPosition}
        />
        <div className="mt-20 flex flex-col items-center">
          <img
            className="w-40 h-44"
            src={icon && `http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
          />
          <p className="text-white text-7xl font-medium mt-10">
            {temp}
            <span className="font-medium text-gray-veryLight text-3xl">
              °{units === "metric" ? "C" : "F"}
            </span>
          </p>
          <p className="text-4xl mt-6 text-gray-veryLight font-semibold">
            {main}
          </p>
          <div className="text-gray-light font-medium flex items-center gap-4 mt-12">
            <p>Today</p>
            <span>{" · "}</span>
            <time>{`${day}, ${date} ${month}`}</time>
          </div>
          <div className="mt-8 mb-28 flex items-center gap-2 text-gray-light font-semibold ">
            <MdLocationOn style={{ height: 20 }} />
            <address className="not-italic">
              {name}, {country}
            </address>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
