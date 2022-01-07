//Componets
import HightlightsCard from "./HightlightsCard";

const Hightlights = ({
  humidity,
  pressure,
  windDeg,
  windSpeed,
  setUnits,
  units,
}) => {
  return (
    <div className="hightlights-info w-full bg-blue-veryDark py-8 px-6">
      <div className="text-right">
        <button
          onClick={() => setUnits("metric")}
          className={`w-10 h-10 rounded-full font-bold mr-3 ${
            units === "metric"
              ? "bg-white text-blue-btnUnits"
              : "bg-blue-units text-white"
          }`}
        >
          °C
        </button>
        <button
          onClick={() => setUnits("imperial")}
          className={`w-10 h-10 rounded-full font-bold ${
            units === "imperial"
              ? "bg-white text-blue-btnUnits"
              : "bg-blue-units text-white"
          }`}
        >
          °F
        </button>
      </div>
      <h2 className="text-white text-2xl font-bold mt-4">
        Today’s Hightlights
      </h2>
      <div className="container hightlights-container mt-8">
        <HightlightsCard windDeg={windDeg} windSpeed={windSpeed} />
        <HightlightsCard humidity={humidity} />
        <HightlightsCard pressure={pressure} />
      </div>
    </div>
  );
};

export default Hightlights;
