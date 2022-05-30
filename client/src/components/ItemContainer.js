import React, { useEffect, useState, useRef } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import '../styles/listCard.css';
import Auth from '../utils/auth';
import { useMutation, useLazyQuery } from '@apollo/client';

import { ADD_ITEM, REMOVE_ITEM, TOGGLE_ITEM } from '../utils/mutations';
import { QUERY_LIST } from '../utils/queries';

const ItemContainer = ({listId, renderItems, listData, itemData}) => {

    const [ activeItems, setActiveItems ] = useState(itemData);
    // const [ activeList, setActiveList ] = useState(listData);

    // const [getListItems, { loading, data }] = useLazyQuery(QUERY_LIST, {fetchPolicy: 'network-only'}); 
    // const data = useRef();

    // useEffect(() => {
    //     renderItems()
    //     .then((response) => {
    //         console.log('QUERY_LIST rendered')
    //         setActiveList(response)
    //         data.current = response;
    //         const items = response.data.list.items;
    //         setActiveItems(items)
    //     });
    // }, []);

    // add function to create state object upon opening list

        // remove an item
    const [removeItem] = useMutation(REMOVE_ITEM);

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
    
        // remove the item locally
        const handleRemoveItem = async (event) => {
            event.preventDefault();
            const itemToRemove = event.currentTarget.dataset.id;
            const newItemsArray = activeItems.filter((item) => {
                return item._id !== itemToRemove
            })        
            setActiveItems(newItemsArray);
            await handleRemoveItemDB(listId, itemToRemove);
        };

    // toggle completed status of an item
    const [toggleItem] = useMutation(TOGGLE_ITEM);

        // add function to handle clicking to set checked state
    const toggleChecked = async (event) => {
        event.stopPropagation();
        
        // update state with completed status
        const itemId = event.currentTarget.dataset.id
        const checked = !document.getElementById(itemId).checked;
        const newState = await activeItems.map(item => (item._id === itemId ? {...item, completed: checked} : item ));
        setActiveItems(newState)

        try {
            const { data } = await toggleItem({
                variables: {
                    listId: listId,
                    itemId: itemId,
                    checked: checked
                }
            }) 
        } catch (err) {
            console.error(err);
            }
        };
    
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
        })
        return data.addItem.items[data.addItem.items.length - 1];
        } catch (err) {
        console.error(err);
        }
    };

    // render the item locally
    const handleAddItem = async (event) => {
        event.preventDefault();
        let addedItem = event.target.children[0].value
        // first add Item to DB so I get ID back
        const data = await handleAddItemDB(listId, addedItem) 
        // set to state to render to page
        setActiveItems([
            ...activeItems, 
            {
                itemText: data.itemText,
                completed: data.completed,
                _id: data._id
            }
        ])
        document.getElementById('add-item-form').reset(); // reset the text field after adding item
    };
    
    const addItemForm =
        <form className="new-item-container" onSubmit={handleAddItem}  id="add-item-form">
            <input type="text" className="new-item" maxLength="40" minLength="1" placeholder="Add an Item"></input>
        </form>;

    if(!itemData) {
        return (
            <div className='list-card'>
                <div className='item-container'>
                    <h5>Loading list...</h5>
                </div>
            </div>
        )
    }

    if(itemData) {
        const items = 
        itemData.map((item, index) => (
            <div className="item" key={item._id}>
                <label className="item-label" htmlFor={item._id} >
                    <input type="checkbox" id={item._id} data-index={index} defaultChecked={item.completed}/>
                    <span className='custom-checkbox'  onClick={toggleChecked} data-id={item._id} ></span>
                </label>
                <p className="item-text">
                    {item.itemText}
                </p>
                <div className="item-delete-icon" data-id={item._id} onClick={handleRemoveItem}>
                    <FaTrashAlt />
                </div>
            </div>
        ));

        return (
            <div className='item-container'>
                {items}
                {addItemForm}
            </div>
        )
    }
}

export default ItemContainer;