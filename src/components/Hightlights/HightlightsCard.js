//Icons
import { MdNavigation } from "react-icons/md";

const HightlightsCard = ({ humidity, pressure, windDeg, windSpeed }) => {
  return (
    <div className="bg-blue-dark text-white text-center p-6 hightlights-card">
      {windSpeed >= 0 && (
        <>
          <p>Wind status</p>
          <p className="flex items-end justify-center mt-4">
            <span className="text-6xl font-bold">{windSpeed || 0}</span>
            <span className="text-4xl font-medium">mph</span>
          </p>
          <p className="flex items-center justify-center mt-6 gap-2">
            <MdNavigation
              className="bg-gray-normal bg-opacity-30 text-white w-5 h-5 p-1 rounded-full"
              style={{ transform: `rotate(${windDeg}deg)` }}
            />
            <span>WSW</span>
          </p>
        </>
      )}

      {humidity >= 0 && (
        <>
          <p>Humidity</p>
          <p className="flex items-end justify-center mt-4">
            <span className="text-6xl font-bold">{humidity || 0}</span>
            <span className="text-4xl font-medium ">%</span>
          </p>
          <div className="px-6 mt-4 flex flex-col gap-1">
            <div className="flex justify-between text-gray-veryLight text-xs ">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
            <progress
              value={humidity}
              className="humidity-progress w-full h-2 rounded-full overflow-hidden"
              max="100"
            ></progress>
            <p className="text-right font-bold text-xs text-gray-veryLight">
              %
            </p>
          </div>
        </>
      )}

      {pressure >= 0 && (
        <>
          <p>Air Pressure</p>
          <p className="flex items-end justify-center mt-4">
            <span className="text-6xl font-bold">{pressure || 0}</span>
            <span className="text-4xl font-medium">mb</span>
          </p>
        </>
      )}
    </div>
  );
};

export default HightlightsCard;
