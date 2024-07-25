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
  const [orderBy, setOrderBy] = useState('rating'); // State for sorting field
  const [order, setOrder] = useState('high-to-low'); // State for sorting order

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await apiRequest.get('/hostels');
        const data = response.data;
        sortHostels(data, orderBy, order); // Sort hostels based on selected field and order

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
  }, [setHostels, setFilteredHostels, location.state, orderBy, order]);

  const sortHostels = (data, field, order) => {
    data.sort((a, b) => {
      const valueA = field === 'price' ? a.price : a.averageRating;
      const valueB = field === 'price' ? b.price : b.averageRating;
      return order === 'high-to-low' ? valueB - valueA : valueA - valueB;
    });
    setHostels(data);
    setFilteredHostels(data);
  };

  const handleOrderByChange = (field) => {
    setOrderBy(field);
    sortHostels([...filteredHostels], field, order);
  };

  const handleOrderChange = (order) => {
    setOrder(order);
    sortHostels([...filteredHostels], orderBy, order);
  };

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

      <div className="sort-container">
        <div className="sort-group">
          <label>Order By:</label>
          <button className={`sort-button ${orderBy === 'price' ? 'selected' : ''}`} onClick={() => handleOrderByChange('price')}>Price</button>
          <button className={`sort-button ${orderBy === 'rating' ? 'selected' : ''}`} onClick={() => handleOrderByChange('rating')}>Rating</button>
        </div>
        <div className="sort-group">
          <label>Order:</label>
          <button className={`sort-button ${order === 'high-to-low' ? 'selected' : ''}`} onClick={() => handleOrderChange('high-to-low')}>High to Low</button>
          <button className={`sort-button ${order === 'low-to-high' ? 'selected' : ''}`} onClick={() => handleOrderChange('low-to-high')}>Low to High</button>
        </div>
      </div>

      <div className="main-content">
        <div className="hostel-list-section">
          <h2>Top rated hostels in NUS</h2>
          <List posts={filteredHostels} />
        </div>
        <div className="map-explore-section">
          <h2>Map (click on pin to view hostel info)</h2>
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
