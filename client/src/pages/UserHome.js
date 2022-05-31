import React, { useState, useEffect } from 'react';
import CategoryManager from '../components/CategoryManager';
import Dropdown from '../components/Dropdown';
import Accordion from '../components/Accordion';
import { useLazyQuery } from '@apollo/client';
import '../styles/layout.css';
import '../styles/home.css';

import { QUERY_CURRENT_USER } from '../utils/queries';

export default function Home() {
    const [ category, setCategory ] = useState('default');
    const [ optionIndex, setOptionIndex ] = useState();
    const [ categoryData, setCategoryData ] = useState();

    useEffect(() => {
        getCurrentUser()
    }, []);


    const [getCurrentUser, { loading, data }] = useLazyQuery(QUERY_CURRENT_USER, {
        fetchPolicy: 'network-only'
    })
    
    const handleCategoryChange = (categoryName, categoryColor, chosenIndex) => {
        setCategory(categoryName);
        document.getElementById('category-icon').style.color = categoryColor;
        setOptionIndex(chosenIndex)
        setCategoryData(data.currentUser.categories)
    };

    const categoryReRender = async (currentCatIndex) => {

        await getCurrentUser()
        .then((response) => {
            setOptionIndex(currentCatIndex)
            setCategoryData(response.data.currentUser.categories)
            setCategory(response.data.currentUser.categories[currentCatIndex].categoryName)
            document.getElementById('category-icon').style.color = response.data.currentUser.categories[currentCatIndex].color;
            document.getElementById('category-select').value = response.data.currentUser.categories[currentCatIndex].categoryName;
        })
    }
    
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (data) {

        return (
         <>
          <div className="category-dropdown-container">
            <Dropdown
                value={category}
                onChange={event => handleCategoryChange(event.target.value, event.target.selectedOptions[0].dataset.color, event.target.selectedOptions[0].dataset.index)}
                options={data.currentUser.categories}
            />
          </div>
         <>
            {!optionIndex && <CategoryManager categoryData={data.currentUser.categories} />}
            {optionIndex && <Accordion 
                categoryDataState={categoryData} 
                setCategoryData={setCategoryData}
                categoryReRender={categoryReRender}
                currentCatIndex={optionIndex}
            />}
         </>
        </>
        );
    }
  }