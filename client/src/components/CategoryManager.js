import React, { useState } from 'react';
import Category from '../components/Category';
import '../styles/accordion.css';
import { useMutation } from '@apollo/client';
import { ADD_CATEGORY } from '../utils/mutations';
import Auth from '../utils/auth';
import { categoryColor } from '../utils/colors';
import { FaSquare } from 'react-icons/fa'
import { valueFromAST } from 'graphql';

const CategoryManager = ( { categoryData }) => {
    const [categoryName, setCategoryName] = useState('');
    const [color, setColor] = useState('');
    const [createCategory, {loading, error }] = useMutation(ADD_CATEGORY)

    const { data } = Auth.getProfile();

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
            <form className="categories-form" onSubmit={handleCreateCategory}>
                <input className="categories-input" onChange={(event) => setCategoryName(event.target.value)} />
                <select className="categories-select" onChange={(event) => setColor(event.target.value)}>
                    {categoryColor.map((value, index) => (
                         <option id={value} key={`color${index}`} value={value} style={{backgroundColor: `${value}`, fontSize: "30px"}}>{value}</option>
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