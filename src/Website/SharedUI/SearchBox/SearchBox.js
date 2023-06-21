import React from "react";

const SearchBox = ({ searchQuery, onSearchQueryChange }) => {
  const handleSearchQueryChange = (event) => {
    onSearchQueryChange(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="بحـث عن المنتجــات..."
      value={searchQuery}
      onChange={handleSearchQueryChange}
      className="form-control shadow m-auto" 
    />
  );
};

export default SearchBox;
