import React, {useMemo} from "react";
import useSalesRep from "../../../../hooks/useSalesRep";
import TextField from "../../../form/TextField";
import TooltipError from "../../../form/ToolTipError";

function NameCell({value, inputChange, name, errors}){
    const {nameValidation} = useSalesRep();
    const validName = useMemo(() => errors? true : false, [errors]);
    return(
        <td>
            <TooltipError text={errors} show={validName}>
                <TextField name={name} value={value} onChange={inputChange}/>
                <p className="errors">{value.length === 0? "required" : ""}</p>
            </TooltipError>
        </td>
    )
}

export default NameCell;