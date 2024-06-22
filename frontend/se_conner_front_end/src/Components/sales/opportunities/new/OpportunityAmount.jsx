import React, {useEffect, useMemo} from "react";
import useOpportunity from "../../../../hooks/useOpportunity";

function OpportunityAmount({value, inputChange, errors, FIELDS, submit_errors}){
    

    return(
        <div>
            <label>Value</label>
            <input type="text"
                    name={FIELDS.VALUE}
                    value={value}
                    onChange={(e)=>inputChange(e)}
                    />
        <p className="error">{errors && errors.value? errors.value : ""}</p>
        <p className="error">{submit_errors && submit_errors.value? submit_errors.value : ""}</p>
        </div>
    )
}

export default OpportunityAmount;