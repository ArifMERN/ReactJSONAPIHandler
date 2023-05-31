import React, { useContext, useState } from "react";
import { DataContext } from "../ContextApi/ContextApi";

const GlobalSearch = () => {
  const { dispatch, data, allData } = useContext(DataContext);

  const [query, setQuery] = useState("");
  const onSearch = (e) => {
    e.preventDefault();
    if (query === "") {
      dispatch({ type: "SET_SEARCH_DATA", payload: allData });
    } else {
      const keys = Object.keys(allData[0]);
      const filteredData = allData.filter((item) =>
        keys.some((key) => JSON.stringify(item[key]).includes(query.trim()))
      );
      dispatch({ type: "SET_SEARCH_DATA", payload: filteredData });
    }
  };

  return (
    <header>
      <form className="search">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Global Search..."
        />
        <button onClick={(e) => onSearch(e)}>search</button>
      </form>
    </header>
  );
};

export default GlobalSearch;
