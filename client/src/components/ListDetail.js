import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import '../styles/listDetail.css';
import ListActions from './ListActions';
import Auth from '../utils/auth';

import { useMutation } from '@apollo/client';

import { ADD_ITEM, REMOVE_ITEM, TOGGLE_ITEM } from '../utils/mutations';

const ListDetail = ({listData}) => {

    console.log('auth', Auth, Auth.loggedIn())
    const [ activeListData, setActiveListData ] = useState(listData);
    const [ activeListItems, setActiveListItems ] = useState(listData.items);

    console.log('state', activeListData);


    // add function to create state object upon opening list

        // remove an item
    const [removeItem, { error }] = useMutation(REMOVE_ITEM);

        const handleRemoveItemDB = async (listId, itemId) => {     
            const token = Auth.loggedIn() ? Auth.getToken() : null;
            if (!token) { return false; }
    
            try {
            const { data } = await removeItem({
                variables: {
                    listId,
                    itemId,
                }
            });
            console.log('Item removed:', data);
            } catch (err) {
            console.error(err);
            }
        };
    
        // render the item locally
        const handleRemoveItem = async (event) => {
            event.preventDefault();
            console.log(activeListItems);
            let itemToRemove = event.currentTarget.dataset.id
            let newState = activeListItems.filter((item) => {
                return item._id !== itemToRemove
            })
            await setActiveListItems(newState)
            await handleRemoveItemDB(listData._id, itemToRemove) 
            console.log(activeListItems);
        };

    // toggle completed status of an item
    // const [toggleItem] = useMutation(TOGGLE_ITEM);

        // add function to handle clicking to set checked state
    const toggleChecked = async (itemId, listId) => {
        let checked = document.getElementById(itemId).checked;
        checked ? checked = false : checked = true;
        
        // try {
        //     const { data } = await toggleItem({
        //         variables: {
        //             listId,
        //             itemId,
        //             checked
        //         }
        //     });
        //     console.log('Item toggled', data);
        // } catch (err) {
        // console.error(err);
        // }

    }
    
    // add the item to the DB
    const [addItem] = useMutation(ADD_ITEM);

    const handleAddItemDB = async (listId, itemText) => {     
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) { return false; }

        try {
        const { data } = await addItem({
            variables: {
                listId,
                itemText,
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
                <label className="item-label" htmlFor={item._id} onClick={() => toggleChecked(item._id, listData._id)}>
                    {item.itemText}
                    <input type="checkbox" id={item._id} data-index={index} defaultChecked={item.completed}/>
                    <span className='custom-checkbox'></span>
                </label>
                <div className="item-delete-icon" data-id={item._id} onClick={handleRemoveItem}>
                    <FaTrashAlt />
                </div>
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