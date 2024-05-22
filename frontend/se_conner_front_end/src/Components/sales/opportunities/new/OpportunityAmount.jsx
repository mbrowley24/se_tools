import React, {useEffect, useMemo} from "react";
import useSalesRep from "../../../../hooks/useSalesRep";



function OpportunityAmount({value, inputChange, isValid}){
    const {FIELDS, quotaValidation} = useSalesRep();
    const valid = useMemo(()=>quotaValidation(value), [value])
    
    useEffect(()=>{
        isValid(FIELDS.AMOUNT, valid)
    }, [valid])

    return(
        <div>
            <label>Amount</label>
            <input type="text"
                    name={FIELDS.AMOUNT}
                    value={value}
                    onChange={(e)=>inputChange(e)}
                    />
        <p className="error">{valid? "" : "Required"}</p>
        </div>
    )
}

export default OpportunityAmount;