import React, { useEffect, useState} from 'react';
import { useMutation, useQuery } from '@apollo/client';

import Auth from '../utils/auth';
import { QUERY_ALL_USERS, QUERY_CURRENT_USER_SHARED_LIST } from '../utils/queries';
import { FaSearch } from 'react-icons/fa'
import ModalLoading from './ModalLoading';
import { RiShareBoxFill } from 'react-icons/ri';
import BtnShareList from './BtnShareList';

const ShareSearch = ({listData, sharedIds, setSharedIds, loadingModalState, setLoadingModal}) => {

    const [ result, setResult ] = useState(<p>Search for users by email address and select them to share your list.</p>)
    const { data, error } = useQuery(QUERY_ALL_USERS, {
        fetchPolicy: 'network-only'
    })
    
    const currentUser = useQuery(QUERY_CURRENT_USER_SHARED_LIST, {
        fetchPolicy: 'network-only'
    })

    
    if(error) {
        setResult(<p>Unable to retrieve user data. Please try again.</p>)
    }
    
   
    if(data) {
        const searchResults = async (event) => {
            event.preventDefault();

            await data.users.map((user, index) => {
                if(user.email.includes(event.target[0].value)) {
                    let alreadyShared = sharedIds.includes(user._id)
                    if (alreadyShared) {
                        console.log('a')
                        setResult(
                            <div className="share-modal-result" key={`${listData.list._id}-search${index}`}>
                                <div>
                                    {user.firstName} {user.lastName}
                                </div>
                                <div className="item-delete-icon isDisabled" data-id={user._id}>
                                    <RiShareBoxFill />
                                </div>
                            </div>)
                    } else {
                        console.log('b')
                        setResult(
                            <div className="share-modal-result" key={`${listData.list._id}-search${index}`}>
                                <div>
                                    {user.firstName} {user.lastName}
                                </div>
                                <BtnShareList shareHistory={currentUser.data.currentUser.shareHistory} sharedWithId={user._id} sharedIds={sharedIds} setSharedIds={setSharedIds} listId={listData.list._id} loadingModalState={loadingModalState} setLoadingModal={setLoadingModal} /> 
                            </div>)
                    }
                } else { setResult(<p>No users found. Please try again.</p>) }
            })
        }
        
        const searchBar =
                <div className="search-container">
                    <form onSubmit={searchResults}>
                        <input type="text" placeholder="Enter email.." required name="search" minLength="2" />
                        <button type="submit">
                            <FaSearch />
                        </button>
                    </form>
                </div>
    
        return (
                <div>
                    <p>User Search:</p>
                    {searchBar}
                    {result}
                </div>

            )
    }

    return <ModalLoading text="Retrieving user data..." />
}

export default ShareSearch;