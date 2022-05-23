import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import '../styles/listDetail.css';

const ListDetail = ({listData}) => {

    console.log(listData);

    const itemData = 
        listData.items.map((item, index) => (
            <div className="item" >
                <input type="checkbox" id={`${listData._id}-item${index}`} key={`${listData._id}-item${index}`} data-index={index} />
                <label className="item-label" for={`${listData._id}-item${index}`} >{item.itemText}</label>
                <IconContext.Provider value={{ className: 'item-delete-icon' }}>
                    <FaTrashAlt />
                </IconContext.Provider>
            </div>
        ));


    return (
        <div className='item-container'>
            {itemData}
        </div>
    )
}


export default ListDetail;