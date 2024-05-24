import React, {useMemo} from "react";
import useSalesRep from "../../../../hooks/useSalesRep";
import TextField from "../../../form/TextField";
import TooltipError from "../../../form/ToolTipError";

function EmailCell({value, inputChange, name}){
    const {emailValidation} = useSalesRep();
    const validEmail = useMemo(() => emailValidation(value) || value === "", [value])
    return(
        <td>
            <TooltipError text="Enter valid email" show={!validEmail}>
                <TextField name={name} value={value} onChange={inputChange}/>
            </TooltipError>
        </td>
    )
}

export default EmailCell;