import React from 'react';
import { useQuery } from '@apollo/client'
import { QUERY_CURRENT_USER_SHARED_LIST } from '../utils/queries';
import { RiShareBoxFill } from 'react-icons/ri'
import BtnShareList from './BtnShareList';

const ShareHistory = ({listData, sharedIds, setSharedIds, loadingModalState, setLoadingModal}) => {

   const {loading, data, error} = useQuery(QUERY_CURRENT_USER_SHARED_LIST, {fetchPolicy: 'network-only'});

    if(loading) {
        return <h4 className='modal-h4'>Loading list...</h4>
    }

    if(error) {
        return <h4>Unable to retrieve data</h4>
    }

    if(data){

        const userList = data.currentUser.shareHistory
        let sharedList;
        
        if(userList.length > 0){
        sharedList = 

            userList.map((user, index) => {
                let alreadyShared = sharedIds.includes(user._id)
                if (alreadyShared) {
                    return (
                        <div className="share-modal-result" key={`${listData.list._id}-history${index}`}>
                            <div>
                                {user.firstName} {user.lastName}
                            </div>
                            <div className="item-delete-icon isDisabled" data-id={user._id}>
                                <RiShareBoxFill />
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className="share-modal-result" key={`${listData.list._id}-history${index}`}>
                            <div>
                                {user.firstName} {user.lastName}
                            </div>
                            <BtnShareList shareHistory={userList} sharedWithId={user._id} sharedIds={sharedIds} setSharedIds={setSharedIds} listId={listData.list._id} loadingModalState={loadingModalState} setLoadingModal={setLoadingModal} /> 
                        </div>
                    )
                }
            });

        } else {
            sharedList = <p className='list-shared-p'>You have not shared any lists.</p>;
        }


        return (
            <>
                {sharedList}
            </>
        )
    }

}

export default ShareHistory;
