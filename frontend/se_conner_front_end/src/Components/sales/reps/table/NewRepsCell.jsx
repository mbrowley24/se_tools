import React, {useMemo} from "react";
import useHttp from "../../../../hooks/useHttp";
import useSalesRep from "../../../../hooks/useSalesRep";
import { salesRepActions } from "../../../../store/salesRep";
import { useDispatch } from "react-redux";
function NewRepsCell({data, reset, errors}){
    const {httpRequest} = useHttp();
    const dispatch = useDispatch();
    const {formatForBackend} = useSalesRep();
    const valid = useMemo(() => Object.keys(errors).length > 0? true : false, [errors])
    

    async function submit(e){
        e.preventDefault();

        const paraseSalesRep = JSON.parse(JSON.stringify(data))

        const saleRepObj = formatForBackend(paraseSalesRep);

        reset();

        const configRequest={
            url: "api/v1/sales-reps",
            method: "POST",
            data: saleRepObj,
        }

        function applyData(res){
            
            if(res.status === 200){
                
                dispatch(salesRepActions.addRep(res.data))
                
            }
        }

        await httpRequest(configRequest, applyData)

    }


    return(
        <td colSpan={'2'} className="">
            <button className="update"
            disabled={valid}
                onClick={(e)=> submit(e)}
            >
                <span className="material-symbols-outlined">
                    save
                </span>
            </button> 
            <button className="reset"
                onClick={()=>reset()}
            >
                <span className="material-symbols-outlined">
                    undo
                </span>
        </button>
        </td>
    )
}

export default NewRepsCell;