import React, {useMemo, useState} from "react";
import useSalesRep from "../../../../hooks/useSalesRep";
import RoleSelection from "../new/RoleSelection";
import TooltipError from "../../../form/ToolTipError";


function RoleCell({value, inputChange,  errors}){
    const [roleValid, setRoleValid] = useState(true)
    const validRole = useMemo(() => roleValid || value === "", [value])



    return(
        <td>
            
            <RoleSelection data={value} inputChange={inputChange} validIsRole={setRoleValid}/>
            <p className="errors">{errors?  errors : ""}</p>
        </td>
    )
}

export default RoleCell;