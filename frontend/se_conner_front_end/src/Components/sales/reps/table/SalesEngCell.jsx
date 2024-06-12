import React from "react";





function SalesEngCell({data}){
    console.log(data)
    return(
        <td>
            {data?.name}
        </td>
    )
}

export default SalesEngCell;