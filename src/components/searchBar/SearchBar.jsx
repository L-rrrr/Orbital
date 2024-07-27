// import React, { useState } from 'react';
// import './searchBar.scss';

// const SearchBar = ({ hostels, setFilteredHostels }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearchTermChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleApplySearch = () => {
//     const term = searchTerm.toLowerCase();
//     const filtered = hostels.filter((hostel) =>
//       hostel.name.toLowerCase().includes(term) || hostel.type.toLowerCase().includes(term)
//     );
//     setFilteredHostels(filtered);
//   };

//   return (
//     <div className="search-bar-container">
//       <input
//         type="text"
//         placeholder="Search hostel by name"
//         className="search-bar"
//         value={searchTerm}
//         onChange={handleSearchTermChange}
//       />
//       <button className="apply-search-button" onClick={handleApplySearch}>
//         Search
//       </button>
//     </div>
//   );
// };

// export default SearchBar;

import React, { useState } from 'react';
import './searchBar.scss';

const SearchBar = ({ onSearch, isFilterApplied, isSearchApplied }) => {
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

