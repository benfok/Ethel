import React from 'react';
import List from './List';
import '../styles/accordion.css';

// receives category data and the index of a nested list array - if it exists
// in the case of categories, the default category option and the all categories options within the drop down will not correspond with index values within the categories.lists array and so must be handled conditionally
const Accordion = ({categoryData, listIndex}) => {
//   console.log('cat-data', categoryData)

   let listData; 

   if (listIndex === 'all') {
    // will return all lists
      listData =
        categoryData.map((category) => (
          category.lists.map((list, index) => (
            <List 
                listData = {list}
                listIndex = {index}
                color = {category.color}
                categoryId={category._id}
                key = {list._id}
            />
          ))
        ))
  } else {
    // will return lists from the selected category only
      listData = 
        categoryData[listIndex].lists.map((list, index) => (
          <List 
            listData = {list}
            listIndex = {index}
            color = {categoryData[listIndex].color}
            categoryId={categoryData[listIndex]._id}
            key = {list._id}
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