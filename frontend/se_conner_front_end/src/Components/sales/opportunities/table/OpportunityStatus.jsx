import React from "react";
import {useSelector} from "react-redux";


function OpportunityStatus({edit, inputChange, name, value}){
    const oppstatus = useSelector(state => state.companyData.opportunityStatus);

    return(
        <td>
            <select 
                value={value}
                name={name}
                disabled={!edit}
                onChange={(e)=>inputChange(e)}
            >
                {oppstatus && oppstatus.length > 0 && oppstatus.map((stat, index)=>{
                    return(
                        <option key={index} value={stat.value}>{stat.name}</option>
                    )
                })}
            </select>
        </td>
    )
}

export default OpportunityStatus;