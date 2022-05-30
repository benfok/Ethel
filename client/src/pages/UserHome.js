import React, { useState, useEffect } from 'react';
import CategoryManager from '../components/CategoryManager';
import Dropdown from '../components/Dropdown';
import Accordion from '../components/Accordion';
import { useQuery, useLazyQuery } from '@apollo/client';
import '../styles/layout.css';
import '../styles/home.css';

import { QUERY_CURRENT_USER } from '../utils/queries';

export default function Home() {
    const [ category, setCategory ] = useState('default');
    const [ optionIndex, setOptionIndex ] = useState();
    const [ categoryData, setCategoryData ] = useState();
    const [ reRenderKey, setReRenderKey ] = useState('222');

    useEffect(() => {
        getCurrentUser()
    }, []);

    // const { loading, data } = useQuery(QUERY_CURRENT_USER, {
    //     fetchPolicy: 'network-only'
    // })

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
        .then(() => {
            setOptionIndex(currentCatIndex)
            document.getElementById('category-icon').style.color = data.currentUser.categories[currentCatIndex].color;
            document.getElementById('category-select').value = data.currentUser.categories[currentCatIndex].categoryName;
            setReRenderKey(Math.random().toString()) // forces the component to remount
        })
    }
    
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (data) {

        return (
         <>
         <div className="choose-category-field">
          <div className="category-dropdown-container">
            <Dropdown
                value={category}
                onChange={event => handleCategoryChange(event.target.value, event.target.selectedOptions[0].dataset.color, event.target.selectedOptions[0].dataset.index)}
                options={data.currentUser.categories}
            />
          </div>
         </div>
         <div id="lists-wrapper" key={reRenderKey}>
            {!optionIndex && <CategoryManager categoryData={data.currentUser.categories} />}
            {optionIndex && <Accordion 
                categoryDataState={categoryData} 
                setCategoryData={setCategoryData}
                categoryReRender={categoryReRender}
                currentCatIndex={optionIndex}
            />}
            </div>
        </>
        );
    }
  }