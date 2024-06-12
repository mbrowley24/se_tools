import React, {useMemo} from "react";
import useSalesRep from "../../../../hooks/useSalesRep";
import TextField from "../../../form/TextField";
import TooltipError from "../../../form/ToolTipError";

function EmailCell({value, inputChange, name, errors}){
    const {emailValidation} = useSalesRep();
    const validEmail = useMemo(() => errors? true : false, [value])
    
    return(
        <td>
            <TooltipError text={errors} show={validEmail}>
                <TextField name={name} value={value} onChange={inputChange}/>
                {value.length === 0 && <p className="errors">required</p>}
            </TooltipError>
        </td>
    )
}

export default EmailCell;