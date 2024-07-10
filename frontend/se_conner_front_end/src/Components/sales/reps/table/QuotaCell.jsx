import React, {useMemo} from "react";
import useSalesRep from "../../../../hooks/useSalesRep";
import TextField from "../../../form/TextField";
import TooltipError from "../../../form/ToolTipError";

function QuotaCell({value, inputChange, name, edit}){
    const {quotaValidation, addCommas} = useSalesRep();
    const validQuota = useMemo(() => quotaValidation(value) || value === "0.00", [value])
    return(
        <td>
            {
                edit?
                    <TooltipError text="required" show={!validQuota}>
                        <TextField name={name} value={addCommas(value)} onChange={inputChange}/>
                    </TooltipError>
                :
                `$${addCommas(value)}`
            }
            
        </td>
    )
}

export default QuotaCell;