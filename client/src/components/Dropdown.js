import React from 'react';
import '../styles/dropdown.css';
import { FaSquare } from 'react-icons/fa';

// dropdown takes in a an options array and an onChange function
const Dropdown = ({ category, options, onChange }) => {

  return (
      <div className="dropdown-menu">
        <select value={category} onChange={onChange} className="form-field" id="category-select">
          <option key="0" value="default" hidden>Select a Category</option>
          {options.map((option, index) => (
            <option data-index={index} data-color={option.color} id={option._id} key={option._id} value={option.categoryName}>{option.categoryName}</option>
            ))}
          <option data-index="all" data-color="#FFFFFF" id='all-lists' key={options.length} value="all">View All Lists</option>
        </select>
        <div className="dropdown-icon" id="category-icon">
          <FaSquare />
        </div>
      </div>
    );
  };

  export default Dropdown;