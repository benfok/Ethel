import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { MOVE_LIST } from '../utils/mutations'; 
import { FaSquare } from 'react-icons/fa';
import Auth from '../utils/auth';
import { IconContext } from 'react-icons/lib';

const ModalMove = ({toggle, listId, categoryId, categoryDataState, currentCatIndex, categoryReRender}) => {

    console.log(categoryDataState)
    const [loading, setLoading] = useState(false)
    const [moveList] = useMutation(MOVE_LIST);
    const [newCategory, setNewCategory] = useState();
    const [categoryIndex, setCategoryIndex] = useState();
    
    const newCategorySelect = (event) => {
        setNewCategory(event.currentTarget.dataset.id)
        setCategoryIndex(event.currentTarget.dataset.index)
    }

    const categoryList =
        categoryDataState.map((category, index) => {
            return (
            <div className='move-category-list' data-id={category._id} data-index={index} onClick={event => newCategorySelect(event)} key={`move-list-${category._id}`}>
                <div>{category.categoryName}</div>
                <IconContext.Provider value={{ className: "move-list-icon", color: `${category.color}`, size: '20px'}}>
                    <FaSquare />
                </IconContext.Provider>
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
                    {categoryList}
                    <button className="btn-list-action" disabled={loading} onClick={handleMoveList}>Confirm</button>
                    <button className="btn-list-action" disabled={loading} onClick={toggle}>Cancel</button>
                </section>
            </div>
        )
}

export default ModalMove;