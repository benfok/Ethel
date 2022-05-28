import React from 'react';
import List from './List';
import '../styles/accordion.css';

// receives category data and the index of a nested list array - if it exists
// in the case of categories, the default category option and the all categories options within the drop down will not correspond with index values within the categories.lists array and so must be handled conditionally
const Accordion = ({categoryDataState, currentCatIndex, subComponentReRender}) => {
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
                subComponentReRender={subComponentReRender}
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
            subComponentReRender={subComponentReRender}
          />
        ))
  }

    return (
      <div className="accordion-container">
        {listData}
      </div>
    );
};

  export default Accordion;