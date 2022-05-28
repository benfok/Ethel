import React, { useState, useEffect } from 'react';
import CategoryManager from '../components/CategoryManager';
import Dropdown from '../components/Dropdown';
import Accordion from '../components/Accordion';
import { useQuery } from '@apollo/client';
import '../styles/layout.css';
import '../styles/home.css';

import { QUERY_CURRENT_USER } from '../utils/queries';

export default function Home() {
    const [ category, setCategory ] = useState('default');
    const [ optionIndex, setOptionIndex ] = useState();

    const { loading, data } = useQuery(QUERY_CURRENT_USER, {
        fetchPolicy: 'network-only'
    })
    
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        const chosenCategory = event.target.options[event.target.selectedIndex];
        document.getElementById('category-icon').style.color = chosenCategory.dataset.color;
        setOptionIndex(chosenCategory.dataset.index)
    };
    
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (data) {
        // console.log('DB data:', data);

        return (
         <>
            <h2 className="home-h2">My Lists</h2>
            <div className="choose-category-field">
                <div className="category-dropdown-container">
                    <Dropdown
                        value={category}
                        onChange={handleCategoryChange}
                        options={data.currentUser.categories}
                    />
                </div>
            </div>
                {!optionIndex && <CategoryManager categoryData={data.currentUser.categories} />}
                {optionIndex && <Accordion 
                    categoryData={data.currentUser.categories} 
                    listIndex={optionIndex}
                />}
        </>
        );
    }
  }