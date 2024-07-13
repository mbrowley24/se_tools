import React from "react";
import TemplateTableRow from "./TemplateTableRow";

function TableBody({data, reset}){


    return(
        <tbody>
            {data && data.length > 0 && data.map((row, index) => (
                
                <TemplateTableRow key={index} row={row} reset={reset}/>
                
            ))}
            {
                data && data.length === 0 && (
                    <tr className="table-row">
                        <td colSpan="5">No data found</td>
                    </tr>
                )
            }
        </tbody>
    )
}

export default TableBody;