import React, { useState } from 'react';
import ListDetail from './ListDetail';
import '../styles/accordion.css';
import { IoIosArrowDropright, IoIosArrowDropdownCircle } from 'react-icons/io';
import { IconContext } from 'react-icons/lib';

// receives category data and the index of a nested list array - if it exists
// in the case of categories, the default category option and the all categories options within the drop down will not correspond with index values within the categories.lists array and so must be handled conditionally
const Accordion = ({categoryData, listIndex}) => {
  
  const [ activeList, setActiveList ] = useState();

  const handleActiveListChange = (event, key) => {
    if(key === activeList) {
      setActiveList();
    } else {
      setActiveList(key);
     }
  }

  let listData; 

   if (!listIndex) {
      listData = <div className="list">List Data will Appear Here</div>
  }  else if (listIndex === 'all') {
    // will return all lists
      listData =
        categoryData.map((category) => (
          category.lists.map((list, index) => (
            <div key={list._id} >
              <div className="list" data-index={index} onClick={event => handleActiveListChange(event, list._id)} style={{borderRight: `solid 15px ${category.color}` }}>
                <span>{list.listName}</span>
                <IconContext.Provider value={{ className: "list-icon" }}>
                  {activeList === list._id ? <IoIosArrowDropdownCircle /> : <IoIosArrowDropright />}
                </IconContext.Provider>
              </div>
            {activeList === list._id && <ListDetail listData={list} key={`listDetail-${index}`} />}
            </div>
          ))
        ))
  } else {
    // will return lists from the selected category only
      listData = 
        categoryData[listIndex].lists.map((list, index) => (
          <div key={list._id} >
            <div className="list" data-index={index} onClick={event => handleActiveListChange(event, list._id)} style={{borderRight: `solid 15px ${categoryData[listIndex].color}` }}>
                <span>{list.listName}</span>
                <IconContext.Provider value={{ className: "list-icon" }}>
                  {activeList === list._id ? <IoIosArrowDropdownCircle /> : <IoIosArrowDropright />}
                </IconContext.Provider>
            </div>
            {activeList === list._id && <ListDetail listData={list} key={`listDetail-${index}`} />}
          </div>
        ))
  }

    return (
      <div className="accordion-container">
        {listData}
      </div>
    );
};

  export default Accordion;