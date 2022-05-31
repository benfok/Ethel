import React, { useState } from 'react';
import ListCard from './ListCard';
import '../styles/accordion.css';
import { IoIosArrowDropright, IoIosArrowDropdownCircle } from 'react-icons/io';
import { IconContext } from 'react-icons/lib';
import Auth from '../utils/auth';

// receives category data and the index of a nested list array - if it exists
// in the case of categories, the default category option and the all categories options within the drop down will not correspond with index values within the categories.lists array and so must be handled conditionally
const List = ({listData, listIndex, color, categoryId, categoryDataState, currentCatIndex, categoryReRender}) => {
  // console.log('list-data', listData)
  const [ activeList, setActiveList ] = useState({});

  // sets whether the current user owns this list. If not, some list actions will not be visible
  let isOwner;

  const handleActiveListChange = (event, key) => {
    if(key === activeList) {
      setActiveList();
      event.currentTarget.classList.remove('list-open');
    } else {
      setActiveList(key);
      event.currentTarget.classList.add('list-open');
     }
  }

  listData.owner === Auth.getProfile().data._id ? isOwner = true : isOwner = false;  // sets the editable flag


  return (

      <div className="accordion-div">
        <div className="list" data-index={listIndex} onClick={event => handleActiveListChange(event, listData._id)} style={{borderRight: `solid 15px ${color}` }}>
          <span>{listData.listName}</span>
          <IconContext.Provider value={{ className: "list-icon" }}>
            {activeList === listData._id ? <IoIosArrowDropdownCircle /> : <IoIosArrowDropright />}
          </IconContext.Provider>
        </div>

      {activeList === listData._id && <ListCard 
        listId={listData._id} 
        isOwner={isOwner} 
        categoryId = {categoryId}
        currentCatIndex={currentCatIndex}
        categoryDataState={categoryDataState} 
        categoryReRender={categoryReRender}  />}
      </div>

  )
};

export default List;