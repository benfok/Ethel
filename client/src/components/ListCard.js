import React, { useEffect, useState } from 'react';
import '../styles/listCard.css';
import ItemContainer from './ItemContainer';
import ModalDelete from './ModalDelete';
import ModalShare from './ModalShare';
import ModalMove from './ModalMove';
import { useLazyQuery } from '@apollo/client';
import { QUERY_LIST } from '../utils/queries';
import ModalLoading from './ModalLoading';
import SharedSection from './SharedSection';

const ListCard = ({listId, isOwner, categoryId, categoryDataState, currentCatIndex, categoryReRender}) => {

    const [ deleteModal, setDeleteModal] = useState(false);
    const [ shareModal, setShareModal] = useState(false);
    const [ moveModal, setMoveModal] = useState(false);
    const [ loadingModal, setLoadingModal ] = useState(false);

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
        const { data, loading } = await getListItems({
            variables: {
                listId
            }
        })
        if(loading) {
            setLoadingModal(true);
            console.log('loading')
        }
        if(data) {
            setReRenderKey(Math.random().toString()) // forces the component to remount
            setLoadingModal(false);
            console.log('rendered')
        }
    }

    const toggleDeleteModal = () => {
        setDeleteModal(!deleteModal)
        // document.getElementById('react-content-container').classList.toggle('isFixed');
    }

    const toggleShareModal = () => {
        setShareModal(!shareModal)
        // document.getElementById('react-content-container').classList.toggle('isFixed');
    }

    const toggleMoveModal = () => {
        setMoveModal(!moveModal)
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
    console.log('data load', data)
        return (
            <div className='list-card' key={reRenderKey}>
                {loadingModal && <ModalLoading text="Refreshing..." />}
                {deleteModal && <ModalDelete 
                    toggle={toggleDeleteModal} listId={listId}         
                    categoryId = {categoryId}
                    currentCatIndex={currentCatIndex}
                    categoryDataState={categoryDataState} 
                    categoryReRender={categoryReRender} />}
                {shareModal && <ModalMove toggle={toggleMoveModal} listData={data} />}
                {shareModal && <ModalShare toggle={toggleShareModal} listData={data} />}
                <ItemContainer listId={listId} renderItems={renderItems} listData={data.list} itemData={data.list.items} />
                <div className='list-shared-container'>
                    <SharedSection data={data} />
                </div>
                <div className='list-action-container'>
                    <button className="btn-list-action" onClick={renderItems}>Refresh</button>
                    {isOwner && <button className="btn-list-action" onClick={toggleShareModal}>Share</button>}
                    {isOwner && <button className="btn-list-action" onClick={toggleMoveModal}>Move</button>}
                    {isOwner && <button className="btn-list-action" onClick={toggleDeleteModal}>Delete</button>}
                </div>
            </div>
        )
                }
    }


export default ListCard;