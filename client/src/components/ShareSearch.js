import React, { useState} from 'react';
import { useQuery } from '@apollo/client';

import Auth from '../utils/auth';
import { QUERY_ALL_USERS, QUERY_CURRENT_USER_SHARED_LIST } from '../utils/queries';
import { FaSearch } from 'react-icons/fa'
import ModalLoading from './ModalLoading';
import { RiShareBoxFill } from 'react-icons/ri';
import BtnShareList from './BtnShareList';

const ShareSearch = ({listData, sharedIds, setSharedIds, loadingModalState, setLoadingModal}) => {

    const [calculating, setCalculating] = useState(false)
    const [ result, setResult ] = useState(<p className='list-shared-p'>Search for users by email address and select them to share your list.</p>)
    const { data, error } = useQuery(QUERY_ALL_USERS, {
        fetchPolicy: 'network-only'
    })
    
    const currentUser = useQuery(QUERY_CURRENT_USER_SHARED_LIST, {
        fetchPolicy: 'network-only'
    })
   
    
    if(error) {
        return <p>Unable to retrieve user data. Please try again.</p>
    }
       
    if(data) {
        const searchResults = async (event) => {
            event.preventDefault();
            setCalculating(true)
            let result;

            const thisUser = await Auth.getProfile();

            const validResults = [];

            for(let i = 0; i < data.users.length; i++) {
                if(data.users[i].email.includes(event.target[0].value) && thisUser.data._id !== data.users[i]._id) {
                    validResults.push(data.users[i])
                } 
            }
               
                    if (validResults.length > 0) { 

                        result = 
                            validResults.map((user, index) => {
                            let alreadyShared = sharedIds.includes(user._id)
                            if (alreadyShared) {
                                return (
                                    <div className="share-modal-result" key={`${listData.list._id}-search${index}`}>
                                        <div>
                                            {user.firstName} {user.lastName}
                                        </div>
                                        <div className="item-delete-icon isDisabled" data-id={user._id}>
                                            <RiShareBoxFill />
                                        </div>
                                    </div>)
                            } else {
                                return (
                                    <div className="share-modal-result" key={`${listData.list._id}-search${index}`}>
                                        <div>
                                            {user.firstName} {user.lastName}
                                        </div>
                                        <BtnShareList shareHistory={currentUser.data.currentUser.shareHistory} sharedWithId={user._id} sharedIds={sharedIds} setSharedIds={setSharedIds} listId={listData.list._id} loadingModalState={loadingModalState} setLoadingModal={setLoadingModal} /> 
                                    </div>)
                            }
                        });
                    } else { result = <p>No users found. Please try again.</p> }

            setCalculating(false)
            console.log(result)
            setResult(result)
        }      
            
        const searchBar =
                    <form className="search-container" onSubmit={searchResults}>
                        <input className='search-input' type="text" placeholder="Enter email.." required name="search" minLength="2" />
                        <button className="item-delete-icon search-icon" type="submit">
                            <FaSearch />
                        </button>
                    </form>
    
        return (
                <>
                    <p className='list-shared-p'>User Search:</p>
                    {searchBar}
                    {calculating && <p>Retrieving user data...</p>}
                    <div className='search-results'>
                        {result}
                    </div>
                </>

            )
        }
    

    return <ModalLoading text="Retrieving user data..." />
}

export default ShareSearch;