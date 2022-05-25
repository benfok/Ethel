import React, { useState, useContext } from 'react';
import Dropdown from '../components/Dropdown';
import Accordion from '../components/Accordion';
import { useQuery } from '@apollo/client';
import '../styles/layout.css';
// import { useCurrentUserContext } from '../contexts/CurrentUserContext';
// import { CurrentUserContextProvider } from '../contexts/CurrentUserContext';

import { QUERY_CURRENT_USER_ALL_DATA } from '../utils/queries';

export default function Home() {
    const [ category, setCategory ] = useState('default');
    const [ optionIndex, setOptionIndex ] = useState();
    // const { currentUser, dispatch } = useCurrentUserContext();

    
    
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        const chosenCategory = event.target.options[event.target.selectedIndex];
        document.getElementById('category-icon').style.color = chosenCategory.dataset.color;
        setOptionIndex(chosenCategory.dataset.index)
    };
    
    const { loading, data } = useQuery(QUERY_CURRENT_USER_ALL_DATA)
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (data) {
        console.log('DB data:', data);
        // dispatch({
        //     type: 'SET_CURRENT_USER_DATA',
        //     currentUser: data
        // })
        return (
        // <CurrentUserContextProvider>
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
        {/* </CurrentUserContextProvider> */}
        </>
        );
    }
  }