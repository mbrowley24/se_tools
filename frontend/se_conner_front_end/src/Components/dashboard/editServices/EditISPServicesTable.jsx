import React from "react";
import EditISPServicesTableHead from "./EditISPServicesTableHead";
import EditISPServicesTableBody from "./EditISPServiceTableBody";






function EditISPServicesTable({data, id, addService}){
    return(
        <table>
            <EditISPServicesTableHead/>
            <EditISPServicesTableBody data={data} id={id} addService={addService}/>
        </table>
    )
}

export default EditISPServicesTable;