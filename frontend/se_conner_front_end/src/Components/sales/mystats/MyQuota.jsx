import React, {useContext} from "react";
import DataContext from "../../../context/dataContext";


function MyQuota(){
    const {userdata} = useContext(DataContext);
    console.log('MyQuota', userdata.quota)
    return(
        <div>
            <h4>${userdata.quota}</h4>
        </div>
    )
}

export default MyQuota;