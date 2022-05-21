import React, { useState } from 'react';
import Dropdown from '../components/Dropdown';
import { useQuery } from '@apollo/client';

import { QUERY_CURRENT_USER } from '../utils/queries';

export default function Home() {
    const [ category, setCategory ] = useState('default');

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        const chosenColor = event.target.options[event.target.selectedIndex].dataset.color;
        document.getElementById('category-icon').style.color = chosenColor;
    };

    const { loading, data } = useQuery(QUERY_CURRENT_USER)

    if (loading) {
        return <div>Loading...</div>;
      }

    if (data) {
        console.log(data);
        console.log(category)

        return (
        <>
            <h2>User Home Screen</h2>
            <Dropdown
                value={category}
                onChange={handleCategoryChange}
                options={data.currentUser.categories}
            />
        </>
        );
    }
  }