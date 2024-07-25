import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHostels } from '../../contexts/HostelContext';
import './filter.scss';

const Filter = () => {
  const { hostels, setFilteredHostels } = useHostels();
  const [propertyType, setPropertyType] = useState([]);
  const [roomType, setRoomType] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [mealPlan, setMealPlan] = useState([]);
  const [academicPrograms, setAcademicPrograms] = useState([]);
  const [hostelActivities, setHostelActivities] = useState([]);
  const navigate = useNavigate();

  const toggleSelection = (state, setState, value) => {
    setState(prevState =>
      prevState.includes(value)
        ? prevState.filter(item => item !== value)
        : [...prevState, value]
    );
  };

  const setFilter = (filters) => {
    const { propertyType, roomType, minPrice, maxPrice, minRating, mealPlan, academicPrograms, hostelActivities } = filters;
    const filteredData = hostels.filter((hostel) => {
      const matchesPropertyType = propertyType.length === 0 || propertyType.some(mainType => hostel.type.includes(mainType));
      const matchesRoomType = roomType.length === 0 || roomType.some(subType => hostel.type.includes(subType));
      const matchesMinPrice = minPrice === '' || hostel.price >= parseFloat(minPrice);
      const matchesMaxPrice = maxPrice === '' || hostel.price <= parseFloat(maxPrice);
      const matchesMinRating = hostel.averageRating >= parseFloat(minRating);
      const matchesMealPlan = mealPlan.length === 0 || mealPlan.some(plan => hostel.mealPlan.includes(plan));
      const matchesAcademicPrograms = academicPrograms.length === 0 || academicPrograms.includes(hostel.academicProgrammes);
      const matchesHostelActivities = hostelActivities.length === 0 || hostelActivities.includes(hostel.hostelActivities);
      return matchesPropertyType && matchesRoomType && matchesMinPrice && matchesMaxPrice && matchesMinRating && matchesMealPlan && matchesAcademicPrograms && matchesHostelActivities;
    });
    console.log("Filtered Data: ", filteredData); // Debugging line
    setFilteredHostels(filteredData);
    localStorage.setItem('filteredHostels', JSON.stringify(filteredData)); // Save filtered data to local storage
    localStorage.setItem('isFilterApplied', 'true'); // Save filter state to local storage
    navigate('/home', { state: { fromFilter: true } }); // Navigate back to home page after applying filter
  };

  const handleApplyFilter = () => {
    if (parseFloat(minPrice) > parseFloat(maxPrice)) {
      alert("Min price must be smaller than max price!");
      return;
    }

    const filters = { propertyType, roomType, minPrice, maxPrice, minRating, mealPlan, academicPrograms, hostelActivities };
    setFilter(filters);
  };

  return (
    <div className="filter-page">
      <h2>Filter Hostels</h2>
      <div className="filter-container">
        <div className="filter-row">
          <div className="filter-item">
            <label>Property Type</label>
            <div className="button-group">
              {['House', 'Hall', 'Residence', 'Residential College'].map(type => (
                <button
                  key={type}
                  className={`filter-button ${propertyType.includes(type) ? 'selected' : ''}`}
                  onClick={() => toggleSelection(propertyType, setPropertyType, type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-item">
            <label>Room Type</label>
            <div className="button-group">
              {['Single', 'Shared', 'Apartment', '(AC)', '(Non-AC)'].map(type => (
                <button
                  key={type}
                  className={`filter-button ${roomType.includes(type) ? 'selected' : ''}`}
                  onClick={() => toggleSelection(roomType, setRoomType, type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="filter-row">
          <div className="filter-item">
            <label>Meal Plan</label>
            <div className="button-group">
              {['Yes', 'No'].map(option => (
                <button
                  key={option}
                  className={`filter-button ${mealPlan.includes(option) ? 'selected' : ''}`}
                  onClick={() => toggleSelection(mealPlan, setMealPlan, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-item">
            <label>Academic Programs</label>
            <div className="button-group">
              {['Yes(Compulsory)', 'Yes(Optional)', 'No'].map(option => (
                <button
                  key={option}
                  className={`filter-button ${academicPrograms.includes(option) ? 'selected' : ''}`}
                  onClick={() => toggleSelection(academicPrograms, setAcademicPrograms, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-item">
            <label>Hostel Activities</label>
            <div className="button-group">
              {['Yes(Compulsory)', 'Yes(Optional)'].map(option => (
                <button
                  key={option}
                  className={`filter-button ${hostelActivities.includes(option) ? 'selected' : ''}`}
                  onClick={() => toggleSelection(hostelActivities, setHostelActivities, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="price-row">
          <div className="filter-item">
            <label>Min Price: {minPrice}</label>
            <input
              type="range"
              min="0"
              max="2000"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div className="filter-item">
            <label>Max Price: {maxPrice}</label>
            <input
              type="range"
              min="0"
              max="2000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="filter-item">
          <label>Min Rating: {minRating}</label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
          />
        </div>
        <button className="apply-filter-button" onClick={handleApplyFilter}>
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default Filter;
