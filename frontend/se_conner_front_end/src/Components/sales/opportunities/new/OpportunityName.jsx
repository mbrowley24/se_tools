import React, {useEffect, useMemo} from "react";
import useSalesRep from "../../../../hooks/useSalesRep";




function OpportunityName({value, inputChange, isValid, errors,  FIELDS, submit_errors}){

    return(
        <div>
            <label>Name</label>
            <input type="text"
                    name={FIELDS.NAME}
                    value={value}
                    onChange={(e)=>inputChange(e)}
                    />
            <p className="error">{errors && errors.name? errors.name : ""}</p>
            <p className="error">{submit_errors && submit_errors.name? submit_errors.name : ""}</p>
        </div>
    )
}

export default OpportunityName;