import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { MOVE_LIST } from '../utils/mutations'; 
import { FaSquare } from 'react-icons/fa';
import Auth from '../utils/auth';
import { IconContext } from 'react-icons/lib';

const ModalMove = ({toggle, listId, categoryId, categoryDataState, currentCatIndex, categoryReRender}) => {

    const [loading, setLoading] = useState(false)
    const [moveList] = useMutation(MOVE_LIST);
    const [newCategory, setNewCategory] = useState();
    const [categoryIndex, setCategoryIndex] = useState();
    
    const newCategorySelect = (event) => {
        setNewCategory(event.currentTarget.dataset.id)
        setCategoryIndex(event.currentTarget.dataset.index)
        event.currentTarget.previousSibling.checked = true;
    }

    const categoryList =
        categoryDataState.map((category, index) => {
            return (
            <div key={`move-list-${category._id}`}>
                <input className="move-category-input" type="radio" value={category._id} name="newCategory" />
                <label htmlFor={category._id} className='move-category' data-id={category._id} data-index={index} onClick={event => newCategorySelect(event)} >
                    <span>{category.categoryName}</span>
                    <IconContext.Provider value={{ className: "move-list-icon", color: `${category.color}`, size: '20px'}}>
                        <FaSquare />
                    </IconContext.Provider>
                </label>
            </div>
            )
        })

    const handleMoveList = async () => {

        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) { return false; }

        const { data, loading, error } = await moveList({
            variables: {
                listId,
                oldCategoryId: categoryId,
                newCategoryId: newCategory
            }
        });
            
        if (loading) {setLoading(true)}
        if (data) {
        
            setLoading(false)
            console.log('List Moved');
            await toggle();
            await categoryReRender(categoryIndex);
        } 
        if (error) {console.log(error)}
    }

        return (
            <div className="modal-outer" id="modal-wrapper">
                <section className='modal'>
                    <h4 className="modal-h4">Move List</h4>
                    <p>Select a new category, then click Move</p><br/>
                    <div className="modal-category-list">
                        {categoryList}
                    </div>
                    <div className='modal-action-buttons'>
                        <button className="btn-list-action" disabled={loading} onClick={handleMoveList}>Move</button>
                        <button className="btn-list-action" disabled={loading} onClick={toggle}>Cancel</button>
                    </div>
                </section>
            </div>
        )
}

export default ModalMove;