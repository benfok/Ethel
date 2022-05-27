import React, { useState } from 'react';
import ListDetail from './ListDetail';
import '../styles/accordion.css';
import { IoIosArrowDropright, IoIosArrowDropdownCircle } from 'react-icons/io';
import { IconContext } from 'react-icons/lib';

// receives category data and the index of a nested list array - if it exists
// in the case of categories, the default category option and the all categories options within the drop down will not correspond with index values within the categories.lists array and so must be handled conditionally
const List = ({listData, listIndex, color}) => {
  // console.log('list-data', listData)
  const [ activeList, setActiveList ] = useState({});

  const handleActiveListChange = (event, key) => {
    if(key === activeList) {
      setActiveList();
    } else {
      setActiveList(key);
     }
  }

  return (

      <>
        <div className="list" data-index={listIndex} onClick={event => handleActiveListChange(event, listData._id)} style={{borderRight: `solid 15px ${color}` }}>
          <span>{listData.listName}</span>
          <IconContext.Provider value={{ className: "list-icon" }}>
            {activeList === listData._id ? <IoIosArrowDropdownCircle /> : <IoIosArrowDropright />}
          </IconContext.Provider>
        </div>
      {activeList === listData._id && <ListDetail listId={listData._id} />}
      </>

  )
};

export default List;