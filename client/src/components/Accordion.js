import React from 'react';

// receives category data and the index of a nested list array - if it exists
// in the case of categories, the default category option and the all categories options within the drop down will not correspond with index values within the categories.lists array and so must be handled conditionally
const Accordion = ({categoryData, listIndex}) => {
  
  let listData; 

  if (!listIndex) {
      listData = <li>List Data will Appear Here</li>
  }  else if (listIndex === 'all') {
    // will return all lists
      listData =
        categoryData.map((category) => (
          category.lists.map((list, index) => (
            <li key={index} className="list" data-index={index}>{list.listName}</li>
          ))
        ))
  } else {
    // will return lists from the selected category only
      listData = 
        categoryData[listIndex].lists.map((list, index) => (
          <li key={index} className="list" data-index={index}>{list.listName}</li>
        ))
  }

    return (
      <div className="accordion-container">
          <ul>
            {listData}
          </ul>
      </div>
    );
};

  export default Accordion;