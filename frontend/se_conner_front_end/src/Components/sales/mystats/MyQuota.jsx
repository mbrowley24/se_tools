import React from "react";
import { useDispatch, useSelector } from "react-redux";


function MyQuota(){
    const dispatch = useDispatch();
    const quota = useSelector(state => state.salesRepData.quota);
    return(
        <div>
            <h4>${quota}</h4>
        </div>
    )
}

export default MyQuota;