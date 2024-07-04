import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


function CompaniesToolBar({action, value}){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return(
        <div className="tool_bar">
            <button className="back"
                    onClick={()=>navigate("/sales/companies")}
            >
                Back
            </button>
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