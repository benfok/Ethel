import React, { useState } from 'react';

const SharedSection = ({ data }) => {

    const shared = data.list.sharedList
     
    if(shared) {
        const sharedList = data.list.sharedWith
        const users = sharedList.map((user, index) => {
            return <li key={`shared${index}-${user._id}`}>{user.firstName} {user.lastName}</li>
        })

        return (
            <div className="list-shared-p">
                <p>List currently shared with:</p>
                <ul className="shared-list">
                {users}
                </ul>
            </div>
        )
    }

    if(!shared) {

        return (
            <p className="list-shared-p">
                This list has not been shared.
            </p>
        )
    }

}

export default SharedSection;