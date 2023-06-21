import React from "react";

const SearchBox = ({ searchQuery, onSearchQueryChange }) => {
  return (
    <input
      type="text"
      placeholder="بحـث عن المنتجــات..."
      value={searchQuery}
      onChange={onSearchQueryChange}
      className="form-control shadow m-auto" 
    />
  );
};

export default SearchBox;
