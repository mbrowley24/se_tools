import React from "react";





function DeletePage({data}){


    
    return(
        <div className="message">
            <h1>Delete</h1>
            <div>
                <p className="message-text">
                    {`Are you sure you want to delete ${data.first_name} ${data.last_name} (${data.email})`}
                </p>
            </div>
            <div>
                <button className="delete">Delete</button>
                <button className="actions">Cancel</button>
            </div>
        </div>
    )
};

export default DeletePage;