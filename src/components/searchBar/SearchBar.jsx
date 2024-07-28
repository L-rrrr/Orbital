import React, { useState } from 'react';
import './searchBar.scss';

const SearchBar = ({ onSearch, isFilterApplied }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search hostel by name"
        className="search-bar"
        value={searchTerm}
        onChange={handleInputChange}
        disabled={isFilterApplied}
      />
      <button 
        className="apply-search-button profile" 
        onClick={handleSearch}
        disabled={isFilterApplied}
      >
        Apply
      </button>
    </div>
  );
};

export default SearchBar;