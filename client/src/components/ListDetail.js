import React, { useEffect, useState } from 'react';
import { FaDatabase, FaTrashAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import '../styles/listDetail.css';
import ListActions from './ListActions';
import Auth from '../utils/auth';
import { useMutation, useLazyQuery } from '@apollo/client';

import { ADD_ITEM, REMOVE_ITEM, TOGGLE_ITEM } from '../utils/mutations';
import { QUERY_LIST } from '../utils/queries';

const ListDetail = ({listId}) => {

    const [ activeItems, setActiveItems ] = useState();
    const [ activeList, setActiveList ] = useState();

    // console.log('state', activeListData);

    const [getListItems, { loading, data }] = useLazyQuery(QUERY_LIST, {fetchPolicy: 'network-only'}); 

    useEffect(() => {
        getListItems({
            variables: {
                listId
            }
        })
        .then((response) => {
            console.log('RE-RENDERED')
            setActiveList(response)
            const items = response.data.list.items;
            setActiveItems(items)
        });
    }, [listId, getListItems]);

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
    
        // render the item locally
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
        const newState = await activeItems.map(item => (item._id === itemId ? {...item, completed: !item.completed} : item ));
        setActiveItems(newState)

        try {
            const { data } = await toggleItem({
                variables: {
                    listId: listId,
                    itemId: itemId,
                    checked: false
                }
            }) 
        } catch (err) {
            console.error(err);
            }
        };




        // const state = activeItems;
        // const item = activeItems.find(item => item._id === itemId)
        // item.completed = !item.completed
        // console.log(state)
       
        
        
        // let checked = document.getElementById(itemId).checked;
        // checked ? checked = false : checked = true;
        // console.log(checked)
        
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
            <input type="text" className="new-item" maxLength="40" placeholder="Add an Item"></input>
        </form>;

    const listSharedWith =
        <p className="list-shared-p">
            List shared with:<br/>
            Place Holder | Place Holder | Place Holder
        </p>;


    if(loading) {
        return (
            <div className='list-card'>
                <div className='item-container'>
                    <h4>Loading list...</h4>
                </div>
            </div>
        )
    }

    if(data) {
        const itemData = 
        data.list.items.map((item, index) => (
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
}

export default ListDetail;