import React from "react";
import EditISPServicesTableRow from "./EditISPServicesTableRow";
import NewISPService from "./NewISPService";





function EditISPServicesTableBody({data, id, addService}){
    return(
        <tbody>
            {
                data && data.length > 0 && data.map((service, index) => {
                    return <EditISPServicesTableRow key={index} data={service} id={id} addService={addService}/>
                })
            }

            {
                data && data.length === 0 && <tr><td colSpan="3">No services available</td></tr>
            }
            <NewISPService id={id} addService={addService}/>
        </tbody>
    )
}


export default EditISPServicesTableBody;