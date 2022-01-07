//Components
import SearchForm from "./SearchForm";

//Icons
import { MdClose } from "react-icons/md";

const SearchPlace = ({ handleSearchPlace, handleCitySearch }) => {
  return (
    <div className="fixed top-0 weather-info weather-search left-0 w-full h-full bg-blue-dark p-4 md:px-11 md:py-5 flex flex-col">
      <button
        onClick={handleSearchPlace}
        className="self-end text-white cursor-pointer text-2xl"
      >
        <MdClose />
      </button>
      <SearchForm
        handleCitySearch={handleCitySearch}
        handleSearchPlace={handleSearchPlace}
      />
    </div>
  );
};

export default SearchPlace;
