import React, {useEffect, useMemo} from "react";
import useSalesRep from "../../../../hooks/useSalesRep";

function OpportunityClose({value, inputChange, FIELDS, errors, submit_errors}){
    
    
    return(
        <div>
            <label>Close Date</label>
            <input type="date"
                name={FIELDS.CLOSE}
                value={value}
                onChange={(e)=>inputChange(e)}
            />
            <p className="error">{errors && errors.close? errors.close : ""}</p>
            <p className="error">{submit_errors && submit_errors.close? submit_errors.close : ""}</p>
        </div>
    )
}

export default OpportunityClose;