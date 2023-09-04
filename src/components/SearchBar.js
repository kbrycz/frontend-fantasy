// src/components/SearchBar.js
import React from "react";

const SearchBar = ({ filter, setFilter }) => {
  function handleFilterChange(e) {
    setFilter(e.target.value);
  }

  return (
    <input
      type="text"
      placeholder="Filter by first name"
      value={filter}
      onChange={handleFilterChange}
    />
  );
};

export default SearchBar;
