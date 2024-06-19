import React from "react";



function CompaniesToolBar({toogle, value}){
    
    return(
        <div className="tool_bar">
            <button
            disabled={value}
                onClick={toogle}
            >Opportunities</button>
            <button
                disabled={!value}
                onClick={toogle}
            >Contacts</button>
        </div>
    )
}

export default CompaniesToolBar;