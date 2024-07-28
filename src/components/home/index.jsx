import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { useHostels } from '../../contexts/HostelContext';
import List from '../list/List';
import Map from '../map/Map';
import SearchBar from '../searchBar/SearchBar'; 
import './home.css';
import apiRequest from '../../lib/apiRequest';

const Home = () => {
  const { currentUser, userLoggedIn } = useAuth();
  const { hostels, setHostels, filteredHostels, setFilteredHostels } = useHostels();
  const navigate = useNavigate();
  const location = useLocation();
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [orderBy, setOrderBy] = useState(() => localStorage.getItem('orderBy') || 'rating'); // Default sorting field
  const [order, setOrder] = useState(() => localStorage.getItem('order') || 'high-to-low'); // Default sorting order

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await apiRequest.get('/hostels');
        const data = response.data;
        setHostels(data); // Store the original hostels data

        const storedFilteredHostels = localStorage.getItem('filteredHostels');
        const filterApplied = localStorage.getItem('isFilterApplied') === 'true';

        if (location.state?.fromFilter) {
          if (storedFilteredHostels) {
            const parsedHostels = JSON.parse(storedFilteredHostels);
            setFilteredHostels(parsedHostels);
            setIsFilterApplied(true);
            sortHostels(parsedHostels, orderBy, order); // Sort after setting filtered data
          } else {
            setFilteredHostels(data);
          }
        } else {
          setFilteredHostels(data);
          setIsFilterApplied(false);
          localStorage.removeItem('filteredHostels');
          localStorage.removeItem('isFilterApplied');
          sortHostels(data, orderBy, order); // Sort after setting data
        }
      } catch (error) {
        console.error('Error fetching hostels:', error);
      }
    };

    fetchHostels();
  }, [setHostels, setFilteredHostels, location.state, orderBy, order]);

  const sortHostels = (data, field, order) => {
    const sortedData = [...data].sort((a, b) => {
      const valueA = field === 'price' ? a.price : a.averageRating;
      const valueB = field === 'price' ? b.price : b.averageRating;
      return order === 'high-to-low' ? valueB - valueA : valueA - valueB;
    });
    setFilteredHostels(sortedData);
  };

  const handleOrderByChange = (field) => {
    setOrderBy(field);
    localStorage.setItem('orderBy', field); // Store orderBy state in local storage
    sortHostels(filteredHostels.length > 0 ? filteredHostels : hostels, field, order);
  };

  const handleOrderChange = (order) => {
    setOrder(order);
    localStorage.setItem('order', order); // Store order state in local storage
    sortHostels(filteredHostels.length > 0 ? filteredHostels : hostels, orderBy, order);
  };

  const handleSearch = (searchTerm) => {
    const filteredData = hostels.filter((hostel) =>
      hostel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // setFilteredHostels(filteredData);
    // sortHostels(filteredData, orderBy, order); // Sort after setting filtered data
    const storedOrderBy = localStorage.getItem('orderBy');
    const storedOrder = localStorage.getItem('order');

    // Preserve the sorting state
    const sortField = storedOrderBy || 'rating';
    const sortOrder = storedOrder || 'high-to-low';

    const sortedFilteredData = [...filteredData].sort((a, b) => {
      const valueA = sortField === 'price' ? a.price : a.averageRating;
      const valueB = sortField === 'price' ? b.price : b.averageRating;
      return sortOrder === 'high-to-low' ? valueB - valueA : valueA - valueB;
    });

    setFilteredHostels(sortedFilteredData);
    localStorage.setItem('filteredHostels', JSON.stringify(sortedFilteredData)); // Save filtered data to local storage
    localStorage.setItem('isFilterApplied', 'true'); // Save filter state to local storage
    setIsFilterApplied(true);
    navigate('/home', { state: { fromFilter: true } }); // Navigate back to home page after applying filter
  };

  const handleFilterClick = () => {
    navigate('/filter', { state: { fromFilter: true } });
  };

  const handleCancelFilter = () => {
    setFilteredHostels(hostels);
    localStorage.removeItem('filteredHostels');
    localStorage.removeItem('isFilterApplied');
    setIsFilterApplied(false);
    sortHostels(hostels, orderBy, order); // Sort after canceling filter
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
        <SearchBar onSearch={handleSearch} isFilterApplied={isFilterApplied} />
        <button className="filter-button profile" onClick={handleFilterClick}>
          Filter
        </button>
        {isFilterApplied && (
          <button className="cancel-filter-button profile" onClick={handleCancelFilter}>
            Cancel
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