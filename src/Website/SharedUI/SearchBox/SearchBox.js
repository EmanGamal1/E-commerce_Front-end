import React from "react";

const SearchBox = ({ searchQuery, onSearchQueryChange }) => {
  return (
    <input
      type="text"
      placeholder="Search"
      value={searchQuery}
      onChange={onSearchQueryChange}
      className="form-control shadow w-25 m-auto" 
    />
  );
};

export default SearchBox;
