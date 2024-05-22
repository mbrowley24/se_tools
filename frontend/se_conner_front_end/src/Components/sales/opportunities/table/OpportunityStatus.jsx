import React, {useContext ,useMemo} from "react";
import DataContext from "../../../../context/dataContext";


function OpportunityStatus({status, update}){
    const {oppstatus} = useContext(DataContext);


    return(
        <td>
            <select 
                value={status}
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