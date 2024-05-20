import React, {useContext ,useMemo} from "react";
import DataContext from "../../../../context/dataContext";


function OpportunityStatus({status, update}){
    const {oppstatus} = useContext(DataContext);

    const statusName = useMemo(()=>{
        if(oppstatus && oppstatus.length > 0){
            const statusObj = oppstatus.find(statusObj=>statusObj.id === status);
            return statusObj.name;
        }

    },[status, oppstatus])

    return(
        <td>
            update?
                {statusName}
                :
                <select>
                    {oppstatus && oppstatus.length > 0 && oppstatus.map((stat, index)=>{
                        return(
                            <option key={index} value={stat.id}>{stat.name}</option>
                        )
                    })}
                </select>
                
        </td>
    )
}

export default OpportunityStatus;