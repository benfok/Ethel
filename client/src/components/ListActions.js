import React from "react";

const ListActions = ({editable}) => {

    return (
        <>
            <button className="btn-list-action">Refresh</button>
            {editable && <button className="btn-list-action">Share</button>}
            {editable && <button className="btn-list-action">Move</button>}
            {editable && <button className="btn-list-action">Delete</button>}
        </>
    )

}

export default ListActions;