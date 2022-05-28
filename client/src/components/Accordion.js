import React from 'react';
import List from './List';
import '../styles/accordion.css';
import ethylPic from "../assets/ethyl-radiant.jpg";

// receives category data and the index of a nested list array - if it exists
// in the case of categories, the default category option and the all categories options within the drop down will not correspond with index values within the categories.lists array and so must be handled conditionally
const Accordion = ({categoryDataState, currentCatIndex, categoryReRender}) => {
//   console.log('cat-data', categoryData)

   let listData; 

   if (currentCatIndex === 'all') {
    // will return all lists
      listData =
        categoryDataState.map((category) => (
          category.lists.map((list, index) => (
            <List 
                listData = {list}
                listIndex = {index}
                key = {list._id}
                color = {category.color}
                categoryId = {category._id}
                categoryDataState={categoryDataState} 
                currentCatIndex={currentCatIndex}
                categoryReRender={categoryReRender}
            />
          ))
        ))
  } else {
    // will return lists from the selected category only
      listData = 
        categoryDataState[currentCatIndex].lists.map((list, index) => (
          <List 
            listData = {list}
            listIndex = {index}
            key = {list._id}
            color = {categoryDataState[currentCatIndex].color}
            categoryId = {categoryDataState[currentCatIndex]._id}
            categoryDataState={categoryDataState} 
            currentCatIndex={currentCatIndex}
            categoryReRender={categoryReRender}
          />
        ))
  }

    return (
      <div className="accordion-pic-container">
        <div className="accordion-container">
          {listData}
        </div>
        {/* <img className="ethyl-pic" src={ethylPic} alt="ethyl" /> */}
      </div>
    );
};

  export default Accordion;