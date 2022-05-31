import React, { useState } from 'react';
import Category from '../components/Category';
import '../styles/accordion.css';
import { useMutation } from '@apollo/client';
import { ADD_CATEGORY } from '../utils/mutations';
import { categoryColor } from '../utils/colors';


const CategoryManager = ( { categoryData }) => {
    const [categoryName, setCategoryName] = useState('');
    const [color, setColor] = useState('default');
    const [createCategory, {loading, error }] = useMutation(ADD_CATEGORY)

    function handleCreateCategory(event) {
        event.preventDefault();
        createCategory({ variables: { categoryName, color } });
      }


    const categories = 
        categoryData.map((category, index) => (
            <Category
                category = {category}
                index= {index}
                key = {category._id}
            />
        ))


    return (
        <div className="category-page">
            <h3 className="home-h3">Add New Category</h3>
            <form className="categories-form" onSubmit={handleCreateCategory}>
                <input className="categories-input" placeholder="New Category Name..." onChange={(event) => setCategoryName(event.target.value)} />
                <select className="categories-select" value={color} onChange={(event) => setColor(event.target.value)}>
                    <option key="0" value="default" disabled hidden>Choose Color</option>
                    {categoryColor.map((value, index) => (
                         <option id={value} key={`color${index}`} value={value} style={{backgroundColor: `${value}`, fontSize: "15px", color: `${value}`}}>{value}</option>
                    ))}
                </select>
                <button className="add-btn" disabled={loading} type="submit">
                    Add
                </button>
                {error && <p>{error.message}</p>}
            </form>
            <h3 className="home-h3">My Categories</h3>
            {categories}
        </div>
        
        // <div className="list" key="default-list">List Data will Appear Here</div>
    )
}


export default CategoryManager;