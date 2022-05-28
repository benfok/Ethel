import React, { useState} from 'react';
import '../styles/modal.css';
import { useMutation } from '@apollo/client';
import { REMOVE_LIST } from '../utils/mutations';
import Auth from '../utils/auth';

const ModalDelete = ({toggle, listId, categoryId}) => {

    const [loading, setLoading] = useState(false);
    const [removeList] = useMutation(REMOVE_LIST);
 
    const handleRemoveListDB = async (listId, categoryId) => {

        console.log(listId, categoryId)
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) { return false; }

        const { data, loading, error } = await removeList({
            variables: {
                listId,
                categoryId
            }
        });
            
        if (loading) {setLoading(true)}
        if (data) {
        
            setLoading(false)
            console.log('List removed:', data);
            toggle()
        } 
        if (error) {console.log(error)}
    }
    console.log(Auth.getProfile())
        return (
            <div className="modal-outer" id="modal-wrapper">
                <section className='modal'>
                    <h4>Delete List</h4>
                    {!loading && <p>Deleting a list will remove all items and cannot be undone. Are you sure?</p>}
                    {loading && <p>Deleting, please wait...</p>}
                    <button className="btn-list-action" disabled={loading} onClick={() => {handleRemoveListDB(listId, categoryId)}}>Confirm</button>
                    <button className="btn-list-action" disabled={loading} onClick={toggle}>Cancel</button>
                </section>
            </div>
        )
}

export default ModalDelete;