import React, { useState, useEffect } from 'react';
import './searchBar.scss';

const SearchBar = ({ onSearch, isFilterApplied }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (isFilterApplied) {
      document.getElementById("search-bar").classList.add("disabled");
    } else {
      document.getElementById("search-bar").classList.remove("disabled");
    }
  }, [isFilterApplied]);

  return (
    <div className="search-bar-container">
      <input
        type="text"
        id="search-bar"
        placeholder="Search hostel by name"
        className={`search-bar ${isFilterApplied ? 'disabled' : ''}`}
        value={searchTerm}
        onChange={handleInputChange}
        disabled={isFilterApplied}
      />
      <button 
        className={`apply-search-button ${isFilterApplied ? 'disabled' : ''}`} 
        onClick={handleSearch}
        disabled={isFilterApplied}
      >
        Apply
      </button>
    </div>
  );
};

export default SearchBar;
