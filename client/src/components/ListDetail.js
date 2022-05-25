import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import '../styles/listDetail.css';
import ListActions from './ListActions';
import Auth from '../utils/auth';

import { useMutation} from '@apollo/client';

import { ADD_ITEM } from '../utils/mutations';

const ListDetail = ({listData}) => {

    const [ activeListData, setActiveListData ] = useState(listData);
    const [ activeListItems, setActiveListItems ] = useState(listData.items);

    // add function to create state object upon opening list

        // add function to handle clicking to set checked state
    const toggleChecked = (id) => {
        console.log(id)
        let checked = document.getElementById(id).checked;
        console.log(checked);
        checked ? checked = false : checked = true;
    }

    
    // add the item to the DB
    const [addItem, { error }] = useMutation(ADD_ITEM);

    const handleAddItemDB = async (listId, itemText) => {
        
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
        return false;
        }

        try {
        const { data } = await addItem({
            variables: {
                listId,
                itemText
            }
        });
        console.log('Item added:', data);
        } catch (err) {
        console.error(err);
        }
    };

// render the item locally
    const handleAddItem = async (event) => {
        event.preventDefault();
        let addedItem = event.target.children[0].value
        await setActiveListItems([
            ...activeListItems,
            {
                itemText: addedItem,
                completed: false,
                _id: `item-${activeListItems.length + 1}`
            }
        ])
        await handleAddItemDB(listData._id, addedItem) 
        document.getElementById('add-item-form').reset(); // reset the text field after adding item
    };
    

    const itemData = 
        activeListItems.map((item, index) => (
            <div className="item" key={item._id}>

                <label className="item-label" htmlFor={item._id} onClick={() => toggleChecked(item._id)}>
                    {item.itemText}
                    <input type="checkbox" id={item._id} data-index={index} defaultChecked={item.completed}/>
                    <span className='custom-checkbox'></span>
                </label>
                <IconContext.Provider value={{ className: 'item-delete-icon' }}>
                    <FaTrashAlt />
                </IconContext.Provider>
            </div>
        ));

    const addItemForm =
        <form className="new-item-container" onSubmit={handleAddItem}  id="add-item-form">
            <input type="text" className="new-item" maxLength="40" placeholder="Add an Item"></input>
        </form>;

    const listSharedWith =
        <p className="list-shared-p">
            List shared with:<br/>
            Place Holder | Place Holder | Place Holder
        </p>;


    return (
        <div className='list-card'>
            <div className='item-container'>
                {itemData}
                {addItemForm}
            </div>
            <div className='list-shared-container'>
                {listSharedWith}
            </div>
            <div className='list-action-container'>
                <ListActions />
            </div>
        </div>
    )
}

export default ListDetail;