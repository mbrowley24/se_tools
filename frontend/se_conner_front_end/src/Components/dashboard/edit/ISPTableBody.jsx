import React from "react";
import ISPTableRow from "./ISPTableRow";
import NewISPTableRow from "./NewISPTableRow";
import useISP from "../../../hooks/useISP";


function ISPTableBody({isps, dispatch, data, reset}) {
    const {FIELDS} = useISP();

    function inputChange(e){
        const {value, name} = e.target;
        console.log(name, value)
        dispatch({type: name, payload: value})
    }

    return(
        <tbody>
            {
            isps &&  isps.map((isp, index)=>{
                    return(
                        <ISPTableRow key={index} isp={isp} dispatch={dispatch}/>
                    )
                })
            }
            {
                isps && isps.length === 0 && <tr><td colSpan={5}>No ISP's</td></tr>
            }
            <NewISPTableRow isp={data} 
                            inputChange={inputChange}
                            reset={reset}
            />
        </tbody>
    )
}
export default ISPTableBody;