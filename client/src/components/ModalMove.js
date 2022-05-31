import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { MOVE_LIST } from '../utils/mutations'; 
import { FaSquare } from 'react-icons/fa';
import Auth from '../utils/auth';

const ModalMove = ({toggle, listId, categoryId, categoryDataState, currentCatIndex, categoryReRender}) => {

    console.log(categoryDataState)
    const [loading, setLoading] = useState(false)
    const [moveList] = useMutation(MOVE_LIST);
    const [newCategory, setNewCategory] = useState();
    
    const newCategorySelect = (event) => {
        console.log(event.target)
        // setNewCategory()
    }

    const categoryList = 
        categoryDataState.map((category) => {
            <div className='move-category-list' onClick={event => newCategorySelect(event)}>
                <div data-id={category._id} key={`move-list-${category._id}`}>category.categoryName</div>
                <div className="dropdown-icon" id="category-icon">
                    <FaSquare />
                </div>
            </div>
        })

    const handleMoveList = async () => {
        console.log(categoryId, listId)

        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) { return false; }

        const { data, loading, error } = await moveList({
            variables: {
                listId,
                oldCategoryId: categoryId,
                newCategoryId: categoryId
            }
        });
            
        if (loading) {setLoading(true)}
        if (data) {
        
            setLoading(false)
            console.log('List Moved:', data);
            toggle()
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