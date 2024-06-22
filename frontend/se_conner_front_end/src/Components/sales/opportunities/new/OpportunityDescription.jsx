import React, {useEffect, useMemo} from "react";
import useSalesRep from "../../../../hooks/useSalesRep";


function OpportunityDescription({value, inputChange, FIELDS}){
    

    return(
        <div>
            <label>Description</label>
            <textarea
                name={FIELDS.DESCRIPTION}
                value={value}
                cols={'5'}
                rows={'5'}
                onChange={(e)=>inputChange(e)}
            ></textarea>
            <p className="count">{`${value.length}/255`}</p>
        </div>
    )
}

export default OpportunityDescription;