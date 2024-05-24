import React, {useMemo} from "react";
import useSalesRep from "../../../../hooks/useSalesRep";
import TextField from "../../../form/TextField";
import TooltipError from "../../../form/ToolTipError";

function PhoneCell({value, inputChange, name}){
    const {phoneNumberValidation} = useSalesRep();
    const validEmail = useMemo(() => phoneNumberValidation(value) || value === "", [value])
    
    return(
        <td>
            <TooltipError text="Enter valid Phone" show={!validEmail}>
                <TextField name={name} value={value} onChange={inputChange}/>
            </TooltipError>
        </td>
    )
}

export default PhoneCell;