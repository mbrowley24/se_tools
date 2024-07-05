import React from "react";
import { useSelector } from "react-redux";
import useTextTransform from "../../../hooks/useTextTransform";

function MyQuota(){
    const {valueCommas} = useTextTransform();
    const quota = useSelector(state => state.salesRepData.quota);
    return(
        <div>
            <h4>${valueCommas(quota)}</h4>
        </div>
    )
}

export default MyQuota;