import { MdOutlineGpsFixed } from "react-icons/md";

const WeatherHeader = ({ handleSearchPlace, setSearchCurrentPosition }) => {
  return (
    <header className="flex justify-between items-center">
      <button
        onClick={handleSearchPlace}
        className="bg-gray-normal py-3 px-5 text-base text-white search-btn"
      >
        Seach for places
      </button>
      <button className="bg-gray-normal p-2 text-white w-10 h-10 rounded-full flex justify-center items-center">
        <MdOutlineGpsFixed
          size={"2rem"}
          onClick={() => setSearchCurrentPosition(true)}
        />
      </button>
    </header>
  );
};

export default WeatherHeader;
