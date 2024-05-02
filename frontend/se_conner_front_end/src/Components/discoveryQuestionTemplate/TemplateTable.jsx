import React from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";




function TemplateTable({data}){

    return(
        <table>
            <TableHead/>
            <TableBody data={data}/>
        </table>
    )
}

export default TemplateTable;