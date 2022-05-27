import React from 'react';
import '../styles/accordion.css';
import { FaSquare } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';

const Category = ({ category, index }) => {
// console.log(category)
    return (
          <div className="categories" data-index={index}>
            <span>{category.categoryName}</span>
            <span>({category.lists.length})</span>
            <IconContext.Provider value={{ className: "square-icon", color: `${category.color}`, size: '30px'}}>
                <FaSquare />
            </IconContext.Provider>
          </div>
     )
}


export default Category;