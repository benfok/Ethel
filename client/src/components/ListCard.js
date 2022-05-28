import React, { useEffect, useState } from 'react';
import '../styles/listCard.css';
import ItemContainer from './ItemContainer';
import ModalDelete from './ModalDelete';
import ModalShare from './ModalShare';

const ListCard = ({listId, isOwner, categoryId, categoryDataState, currentCatIndex, categoryReRender}) => {

    const [ deleteModal, setDeleteModal] = useState(false);
    const [ shareModal, setShareModal] = useState(false);

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

        return (
            <div className='list-card'>
                {deleteModal && <ModalDelete 
                    toggle={toggleDeleteModal} listId={listId}         
                    categoryId = {categoryId}
                    currentCatIndex={currentCatIndex}
                    categoryDataState={categoryDataState} 
                    categoryReRender={categoryReRender} />}
                {shareModal && <ModalShare toggle={toggleShareModal} listId={listId} />}
                <ItemContainer listId={listId} />
                <div className='list-shared-container'>
                    {listSharedWith}
                </div>
                <div className='list-action-container'>
                    <button className="btn-list-action">Refresh</button>
                    {isOwner && <button className="btn-list-action" onClick={toggleShareModal}>Share</button>}
                    {isOwner && <button className="btn-list-action">Move</button>}
                    {isOwner && <button className="btn-list-action" onClick={toggleDeleteModal}>Delete</button>}
                </div>
            </div>
        )
    }


export default ListCard;