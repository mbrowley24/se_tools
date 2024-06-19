import React from "react";
import { useDispatch } from "react-redux";


function CompaniesToolBar({action, value}){
    const dispatch = useDispatch();
    
    return(
        <div className="tool_bar">
            <button
            disabled={value.opportunities}
                onClick={()=>dispatch(action.viewOpportunities())}
            >Opportunities</button>
            <button
                disabled={value.contacts}
                onClick={()=>dispatch(action.viewContacts())}
            >Contacts</button>
        </div>
    )
}

export default CompaniesToolBar;