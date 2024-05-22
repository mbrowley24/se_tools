import React, {useEffect, useMemo} from "react";
import useSalesRep from "../../../../hooks/useSalesRep";

function OpportunityClose({value, inputChange, isValid}){
    const {FIELDS, dateValidation} = useSalesRep();
    const valid = useMemo(()=>dateValidation(value), [value])
    
    useEffect(()=>{
        isValid(FIELDS.CLOSE, valid)
    }, [valid])

    return(
        <div>
            <label>Close Date</label>
            <input type="date"
                name={FIELDS.CLOSE}
                value={value}
                onChange={(e)=>inputChange(e)}
            />
            <p className="error">{valid? "" : "Required"}</p>
        </div>
    )
}

export default OpportunityClose;