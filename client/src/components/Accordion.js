import React, { useState } from 'react';
import List from './List';
import '../styles/accordion.css';
import { useMutation } from '@apollo/client';
import { ADD_LIST } from '../utils/mutations';
import Auth from '../utils/auth';
import ethylPic from "../assets/ethyl-radiant.jpg";

// receives category data and the index of a nested list array - if it exists
// in the case of categories, the default category option and the all categories options within the drop down will not correspond with index values within the categories.lists array and so must be handled conditionally
const Accordion = ({categoryDataState, setCategoryData, currentCatIndex, categoryReRender}) => {

  const [listName, setListName] = useState('');

   let listData; 
   let currentUser = Auth.getProfile();

  // add a new list
  const [addList] = useMutation(ADD_LIST);

  const handleAddList = async(event) => {
    event.preventDefault();
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) { return false; }

    let catIndex = 0;
    // if on the all lists screen add new list to uncategorized. Else add to current category
    if(currentCatIndex !== 'all') {
      catIndex = currentCatIndex
    }

    try {
      const { data } = await addList({
          variables: {
              listName,
              owner: currentUser.data._id,
              categoryId: categoryDataState[catIndex]._id
          }
      })
     
      const newState = [...categoryDataState];
      newState[catIndex].lists = [data.addList, ...newState[catIndex].lists];
      setCategoryData(newState);
      
      document.getElementById('add-list-form').reset(); // reset the text field after adding item
      } catch (err) {
      console.error(err);
    }
  };


   const addListForm =
   <form className="new-list-container" onSubmit={handleAddList}  id="add-list-form">
       <input type="text" className="new-item" maxLength="30" minLength="3" placeholder="Enter New List Name..." onChange={(event) => setListName(event.target.value)}></input>
       <button className="btn-primary add-list-btn" type="submit">Add</button>
   </form>;

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
      <div className="list-content-container">
        {addListForm}
        <div className="accordion-container">
          {listData}
        </div>
        </div>
    );
};

  export default Accordion;