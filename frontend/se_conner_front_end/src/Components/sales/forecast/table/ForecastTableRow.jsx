import React from "react";
import { Link } from "react-router-dom";
import useTextTransform from "../../../../hooks/useTextTransform";



function ForecastTableRow({data}){
    const {capitalizeName} = useTextTransform();
    
    return(
        <tr>
            <td>
                {`$ ${data.value}`}
            </td>
            <td>
                {data.start}
            </td>
            <td>
                {data.end}
            </td>
            <td>
                {capitalizeName(data.sales_rep)}
            </td>
            <td>
                {data.opportunities}
            </td>
            <td><Link to={""}>Add Opportunity</Link></td>
        </tr>
    )
}
export default ForecastTableRow;