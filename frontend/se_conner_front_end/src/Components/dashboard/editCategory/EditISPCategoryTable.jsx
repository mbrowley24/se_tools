import React from "react";
import EditISPCategoryTableHead from "./EditISPCategoryTableHead";
import EditISPCategoryTableBody from "./EditISPCategoryTableBody";

function EditISPCategoryTable({data}){
    return(
        <table>
            <EditISPCategoryTableHead />
            <EditISPCategoryTableBody />
        </table>
    )
}

export default EditISPCategoryTable;