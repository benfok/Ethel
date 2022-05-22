import React, { useState } from 'react';
import Dropdown from '../components/Dropdown';
import Accordion from '../components/Accordion';
import { useQuery } from '@apollo/client';

import { QUERY_CURRENT_USER } from '../utils/queries';

export default function Home() {
    const [ category, setCategory ] = useState('default');
    const [ optionIndex, setOptionIndex ] = useState();

    
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        const chosenCategory = event.target.options[event.target.selectedIndex]
        document.getElementById('category-icon').style.color = chosenCategory.dataset.color;
        setOptionIndex(chosenCategory.dataset.index)
    };
    
    const { loading, data } = useQuery(QUERY_CURRENT_USER)
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (data) {

        return (
        <>
            <h2>User Home Screen</h2>
            <Dropdown
                value={category}
                onChange={handleCategoryChange}
                options={data.currentUser.categories}
            />
            <Accordion 
                categoryData={data.currentUser.categories} 
                listIndex={optionIndex}
            />
        </>
        );
    }
  }