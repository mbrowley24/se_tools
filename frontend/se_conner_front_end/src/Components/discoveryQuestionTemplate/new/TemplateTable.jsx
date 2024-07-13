import React from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";




function TemplateTable({data, reset}){

    return(
        <table>
            <TableHead/>
            <TableBody data={data} reset={reset}/>
        </table>
    )
}

export default TemplateTable;