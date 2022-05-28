import React, { useState} from 'react';
import '../styles/modal.css';
import { useMutation, useQuery } from '@apollo/client';
import { SHARE_LIST } from '../utils/mutations';
import Auth from '../utils/auth';
import { QUERY_ALL_USERS } from '../utils/queries';
import { FaSearch } from 'react-icons/fa'

const ModalShare = ({toggle, listId}) => {

    
    const { loading, data, error } = useQuery(QUERY_ALL_USERS, {
        fetchPolicy: 'network-only'
    })

    let modalText = <p>Search for users by email address and share your list with them</p>;
    
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    // const [shareList] = useMutation(SHARE_LIST);

    // const handleShareListDB = async (listId) => {

    //          const token = Auth.loggedIn() ? Auth.getToken() : null;
    //     if (!token) { return false; }

    //     const { data, loading, error } = await shareList({
    //         variables: {
    //             listId,
    //             // sharedWithId
    //         }
    //     });
            
    //     if (loading) {setLoadingUpdate(true)}
    //     if (data) {
        
    //         setloadingUpdate(false)
    //         console.log('List shared:', data);
    //         toggle()
    //     } 
    //     if (error) {console.log(error)}
    // }
    
    const searchResults = (event) => {
        event.preventDefault();
        console.log('stuff')
    }
    
    const searchBar =
            <div className="search-container">
                <form onSubmit={searchResults}>
                    <input type="text" placeholder="Enter email.." name="search" minLength="2" />
                    <button type="submit">
                        <FaSearch />
                    </button>
                </form>
            </div>


    if(loading) {
        modalText = <p>Retrieving user data...</p>
    }

    
    if(error) {
        modalText = <p>Unable to retrieve user data. Please try again.</p>
    }
    
    if(data) {
        modalText = <p>Search for users by email address and select them to share your list.</p>
        console.log(data)
    }
    
    return (
            <div className="modal-outer" id="modal-wrapper">
                <section className='modal'>
                    <h4>Share List</h4>
                    {modalText}
                    {searchBar}
                    <button className="btn-list-action" disabled={loadingUpdate} onClick={searchResults}>Confirm</button>
                    <button className="btn-list-action" disabled={loadingUpdate} onClick={toggle}>Cancel</button>
                </section>
            </div>
        )
}

export default ModalShare;