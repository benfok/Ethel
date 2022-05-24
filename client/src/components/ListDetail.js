import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import '../styles/listDetail.css';
import ListActions from './ListActions';

const ListDetail = ({listData}) => {

    console.log(listData);

    const [ activeListData, setActiveListData ] = useState([])

    // add function to create state object upon opening list

        // add function to handle clicking to set checked state
    const toggleChecked = (id) => {
        console.log(id)
        let checked = document.getElementById(id).checked;
        console.log(checked);
        checked ? checked = false : checked = true;
    }

    const handleAddItem = async (event) => {
            event.preventDefault();
            console.log(event)
            console.log(event.target.children[0].value);
            event.target.children[0].value = '';
    }

    const itemData = 
        listData.items.map((item, index) => (
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

    const addItem =
        <form className="new-item-container" onSubmit={handleAddItem}>
            <input type="text" className="new-item" maxLength="40" placeholder="Add an Item" ></input>
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
                {addItem}
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