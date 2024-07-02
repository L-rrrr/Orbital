import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { useHostels } from '../../contexts/HostelContext';
import List from '../list/List';
import Map from '../map/Map';
import SearchBar from '../searchBar/SearchBar'; 
import './home.css';
import apiRequest from '../../lib/apiRequest'; // Add the import here

const Home = () => {
  const { currentUser, userLoggedIn } = useAuth();
  const { hostels, setHostels, filteredHostels, setFilteredHostels } = useHostels();
  const navigate = useNavigate();
  const location = useLocation();
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await apiRequest.get('/hostels');
        const data = response.data;
        data.sort((a, b) => b.averageRating - a.averageRating);
        setHostels(data);

        const storedFilteredHostels = localStorage.getItem('filteredHostels');
        const filterApplied = localStorage.getItem('isFilterApplied') === 'true';

        if (location.state?.fromFilter) {
          if (storedFilteredHostels) {
            setFilteredHostels(JSON.parse(storedFilteredHostels));
            setIsFilterApplied(true);
          } else {
            setFilteredHostels(data);
          }
        } else {
          setFilteredHostels(data);
          setIsFilterApplied(false);
          localStorage.removeItem('filteredHostels');
          localStorage.removeItem('isFilterApplied');
        }
      } catch (error) {
        console.error('Error fetching hostels:', error);
      }
    };

    fetchHostels();
  }, [setHostels, setFilteredHostels, location.state]);

  // useEffect(() => {
    // console.log('Filtered Hostels:', filteredHostels); // Debugging line
  // }, [filteredHostels]);

  const handleSearch = (filteredData) => {
    setFilteredHostels(filteredData);
  };

  const handleFilterClick = () => {
    navigate('/filter', { state: { fromFilter: true } });
  };

  const handleCancelFilter = () => {
    setFilteredHostels(hostels);
    localStorage.removeItem('filteredHostels');
    localStorage.removeItem('isFilterApplied');
    setIsFilterApplied(false);
  };

  if (!userLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="home-page">
      <header className="header">
        <h1>NUStay</h1>
      </header>

      <div className="search-bar-container"> 
        <SearchBar hostels={hostels} setFilteredHostels={handleSearch} />
        <button className="filter-button profile" onClick={handleFilterClick}>
          Filter
        </button>
        {isFilterApplied && (
          <button className="cancel-filter-button profile" onClick={handleCancelFilter}>
            Cancel Filter
          </button>
        )}
      </div>

      <div className="main-content">
        <div className="hostel-list-section">
          <h2>Top rated hostels in NUS</h2>
          <List posts={filteredHostels} />
        </div>
        <div className="map-explore-section">
          <h2>Map(click on pin to view hostel info)</h2>
          <div className="home-map-container"> 
            <Map items={filteredHostels} />
          </div>
        </div>
      </div>
      <div className="login-info">
        Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.
      </div>
    </div>
  );
};

export default Home;
