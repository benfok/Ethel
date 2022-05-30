import React from 'react';
import  { useMutation } from '@apollo/client';
import { SHARE_LIST, UPDATE_SHARE_HISTORY } from '../utils/mutations';
import Auth from '../utils/auth';
import { RiShareBoxFill } from 'react-icons/ri';

const BtnShareList = ({sharedWithId, shareHistory, sharedIds, setSharedIds, listId, loadingModalState, setLoadingModal}) => {

    console.log('shared History', shareHistory)

    const [shareList] = useMutation(SHARE_LIST);
    const [updateShareHistory] = useMutation(UPDATE_SHARE_HISTORY);

    const handleShareListDB = async (event) => {
        event.preventDefault();

        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) { return false; }

        const { data, loading, error } = await shareList({
            variables: {
                listId,
                sharedWithId
            }
        });
            
        if (loading) {setLoadingModal(true)}
        if (data) {
             setLoadingModal(false)
             setSharedIds([...sharedIds, sharedWithId])
             console.log('hello')
             await handleUpdateShareHistory()
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

            const { data, loading, error } = await updateShareHistory({
                variable: {
                    sharedWithId
                }
            });

            if (loading) {setLoadingModal(true)}
            if (data) {
                setLoadingModal(false)
                console.log('user added to share history')
            } 
            if (error) {console.log(error)}
        }
    }

    return (
        <div className="item-delete-icon" data-id={sharedWithId} onClick={handleShareListDB}>
            <RiShareBoxFill />
        </div>
    )

}

export default BtnShareList;