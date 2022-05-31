import React, { useState} from 'react';
import '../styles/modal.css';
import { useMutation } from '@apollo/client';
import { REMOVE_LIST } from '../utils/mutations';
import Auth from '../utils/auth';

const ModalDelete = ({toggle, listId, categoryId, categoryDataState, currentCatIndex, categoryReRender}) => {

    const [loading, setLoading] = useState(false);
    const [removeList] = useMutation(REMOVE_LIST);
     
    const handleRemoveList = async (listId, categoryId) => {

        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) { return false; }

        let newCatState = categoryDataState
        const newListState = await newCatState[currentCatIndex].lists.filter((list) => list._id !== listId);
        newCatState[currentCatIndex].lists = newListState
        categoryReRender(currentCatIndex);
       
        const { data, loading, error } = await removeList({
            variables: {
                listId,
                categoryId
            }
        });
            
        if (loading) {setLoading(true)}
        if (data) {
        
            setLoading(false)
            console.log('List removed');
            toggle()
        } 
        if (error) {console.log(error)}
    }

    if(currentCatIndex === "all") {
        return (
            <div className="modal-outer" id="modal-wrapper">
                <section className='modal'>
                    <h4 className="modal-h4">Delete List</h4>
                    <p>You cannot delete a list from the All Lists view. Please navigate to the specific category to delete a list.</p>
                    <button className="btn-list-action" disabled={loading} onClick={toggle}>Return</button>
                </section>
            </div>
        )
    }
        return (
            <div className="modal-outer" id="modal-wrapper">
                <section className='modal'>
                    <h4 className="modal-h4">Delete List</h4>
                    {!loading && <p>Deleting a list will remove all items and cannot be undone. Are you sure?</p>}
                    {loading && <p>Deleting, please wait...</p>}
                    <div className='modal-action-buttons'>
                        <button className="btn-list-action" disabled={loading} onClick={() => {handleRemoveList(listId, categoryId)}}>Confirm</button>
                        <button className="btn-list-action" disabled={loading} onClick={toggle}>Cancel</button>
                    </div>
                </section>
            </div>
        )
}

export default ModalDelete;