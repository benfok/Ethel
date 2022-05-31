import React from 'react';

const ModalMove = ({toggle, listId}) => {

        return (
            <div className="modal-outer" id="modal-wrapper">
                <section className='modal'>
                    <h4>Move List</h4>
                    <button className="btn-list-action" disabled={loading} onClick={() => {handleRemoveList(listId, categoryId)}}>Confirm</button>
                    <button className="btn-list-action" disabled={loading} onClick={toggle}>Cancel</button>
                </section>
            </div>
        )
}

export default ModalMove;