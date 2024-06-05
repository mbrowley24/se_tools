import React from "react";
import ISPTableRow from "./ISPTableRow";
import NewISPTableRow from "./NewISPTableRow";



function ISPTableBody({isps, dispatch, actions}) {
    

    return(
        <tbody>
            {
            isps &&  isps.map((isp, index)=>{
                    return(
                        <ISPTableRow key={index} isp={isp} dispatch={dispatch} actions={actions}/>
                    )
                })
            }
            {
                isps && isps.length === 0 && <tr><td colSpan={5}>No ISP's</td></tr>
            }
            <NewISPTableRow dispatch={dispatch} actions={actions}/>
        </tbody>
    )
}
export default ISPTableBody;