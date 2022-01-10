import { useState } from "react";

const SearchForm = ({ handleCitySearch, handleSearchPlace }) => {
  // State
  const [cityName, setCityName] = useState("");

  // Functions
  const handleSubmit = (e) => {
    e.preventDefault();

    /*  setLoader(true); */
    handleCitySearch(cityName);
    handleSearchPlace();
    setCityName("");
  };

  return (
    <form className="flex mt-8 gap-3 w-full" onSubmit={handleSubmit}>
      <input
        type="text"
        value={cityName}
        onChange={({ target }) => setCityName(target.value)}
        placeholder="search location"
        className="text-gray-dark w-9/12 md:w-8/12 py-4 pl-8 lg:pl-16 pr-4 bg-transparent border border-white"
      />
      <input
        type="submit"
        value="Search"
        className="bg-blue-bright font-semibold p-4 w-3/12 md:w-4/12 text-white"
      />
    </form>
  );
};

export default SearchForm;
