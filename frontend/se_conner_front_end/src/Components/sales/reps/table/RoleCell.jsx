import React, {useMemo, useState} from "react";
import useSalesRep from "../../../../hooks/useSalesRep";
import RoleSelection from "../new/RoleSelection";
import TooltipError from "../../../form/ToolTipError";

function NameCell({value, inputChange }){
    const {nameValidation} = useSalesRep();
    const [roleValid, setRoleValid] = useState(true)
    const validRole = useMemo(() => roleValid || value === "", [value])
    return(
        <td>
            <TooltipError text="Must be between 2 and 75 Charters" show={!validRole}>
                <RoleSelection data={value} inputChange={inputChange} validIsRole={setRoleValid}/>
            </TooltipError>
        </td>
    )
}

export default NameCell;