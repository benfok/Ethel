import React, { useState } from 'react';
import  { useMutation } from '@apollo/client';
import { SHARE_LIST, UPDATE_SHARE_HISTORY } from '../utils/mutations';
import Auth from '../utils/auth';
import { RiShareBoxFill } from 'react-icons/ri';

const BtnShareList = ({sharedWithId, shareHistory, sharedIds, setSharedIds, listId, loadingModalState, setLoadingModal}) => {

    const [buttonActive, setButtonActive] = useState();

    const [shareList] = useMutation(SHARE_LIST);
    const [updateShareHistory] = useMutation(UPDATE_SHARE_HISTORY);

    const handleShareListDB = async (event) => {
        event.preventDefault();

        setButtonActive('isDisabled');

        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) { return false; }

        const { data, error } = await shareList({
            variables: {
                listId,
                sharedWithId
            }
        });
        
        if (data) {
            console.log('hello', data)
            await handleUpdateShareHistory()
            setSharedIds([...sharedIds, sharedWithId])
        } 
        if (error) {console.log(error)}
    }

    const handleUpdateShareHistory = async () => {

        const historyArray = await shareHistory.map((user) => {
            return user._id
        })     
        
        if(historyArray.includes(sharedWithId)) {
            console.log('user already in shared history')
        } else {
            
            const { data, error } = await updateShareHistory({
                variables: {
                    sharedWithId
                }
            });

            if (data) {
                console.log('user added to share history')
            } 
            if (error) {console.log(error)}
        }
    }

    return (
        <div className={`item-delete-icon ${buttonActive}`} data-id={sharedWithId} onClick={handleShareListDB}>
            <RiShareBoxFill />
        </div>
    )

}

export default BtnShareList;