import React, {useEffect, useMemo} from "react";
import useSalesRep from "../../../../hooks/useSalesRep";




function OpportunityName({value, inputChange, isValid}){
    const {FIELDS, nameValidation} = useSalesRep();
    const valid = useMemo(()=>nameValidation(value), [value])
    
    useEffect(()=>{
        isValid(FIELDS.NAME, valid)
    }, [valid])

    return(
        <div>
            <label>Name</label>
            <input type="text"
                    name={FIELDS.NAME}
                    value={value}
                    onChange={(e)=>inputChange(e)}
                    />
            <p className="error">{valid? "" : "Required"}</p>
        </div>
    )
}

export default OpportunityName;