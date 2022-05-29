import React, { useEffect, useState } from 'react';
import '../styles/listCard.css';
import ItemContainer from './ItemContainer';
import ModalDelete from './ModalDelete';
import ModalShare from './ModalShare';
import { useLazyQuery } from '@apollo/client';
import { QUERY_LIST } from '../utils/queries';

const ListCard = ({listId, isOwner, categoryId, categoryDataState, currentCatIndex, categoryReRender}) => {

    const [ deleteModal, setDeleteModal] = useState(false);
    const [ shareModal, setShareModal] = useState(false);

    const [ reRenderKey, setReRenderKey ] = useState('222');

    useEffect(() => {
        getListItems({
            variables: {
                listId
            }
        })
    }, [])

    const [getListItems, { loading, data, error }] = useLazyQuery(QUERY_LIST, {fetchPolicy: 'network-only'}); 

    const renderItems = async () => {
        const { data } = await getListItems({
            variables: {
                listId
            }
        })
        setReRenderKey(Math.random().toString()) // forces the component to remount
    }

    const toggleDeleteModal = () => {
        setDeleteModal(!deleteModal)
        // document.getElementById('react-content-container').classList.toggle('isFixed');
    }

    const toggleShareModal = () => {
        setShareModal(!shareModal)
        // document.getElementById('react-content-container').classList.toggle('isFixed');
    }

    const listSharedWith =
        <p className="list-shared-p">
            List shared with:<br/>
            Place Holder | Place Holder | Place Holder
        </p>;

    if(error){<h4>List data could not be loaded</h4>}
    if(loading){<h4>Data loading...</h4>}

    if(data) {
    console.log('data load')
        return (
            <div className='list-card' key={reRenderKey}>
                {deleteModal && <ModalDelete 
                    toggle={toggleDeleteModal} listId={listId}         
                    categoryId = {categoryId}
                    currentCatIndex={currentCatIndex}
                    categoryDataState={categoryDataState} 
                    categoryReRender={categoryReRender} />}
                {shareModal && <ModalShare toggle={toggleShareModal} listId={listId} />}
                <ItemContainer listId={listId} renderItems={renderItems} listData={data.list} itemData={data.list.items} />
                <div className='list-shared-container'>
                    {listSharedWith}
                </div>
                <div className='list-action-container'>
                    <button className="btn-list-action" onClick={renderItems}>Refresh</button>
                    {isOwner && <button className="btn-list-action" onClick={toggleShareModal}>Share</button>}
                    {isOwner && <button className="btn-list-action">Move</button>}
                    {isOwner && <button className="btn-list-action" onClick={toggleDeleteModal}>Delete</button>}
                </div>
            </div>
        )
                }
    }


export default ListCard;