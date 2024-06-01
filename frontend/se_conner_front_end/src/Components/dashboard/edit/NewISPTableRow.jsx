import React, {useState} from "react";
import NewISPName from "./NewISPName";
import NewISPURL from "./NewISPURL";
import NewISPMaps from "./NewISPMaps";
import NewISPActions from "./NewISPActions";
import "../../../css/table/table_form.css";


function NewISPTableRow({isp, inputChange, reset}) {
    const [errors, setErrors] = useState({})  

    

    return (
        <tr>
            <NewISPName isp={isp} inputChange={inputChange} errors={errors}/>
            <NewISPURL isp={isp} inputChange={inputChange} errors={errors}/>
            <NewISPMaps isp={isp} inputChange={inputChange} errors={errors}/>
            <NewISPActions isp={isp} reset={reset}/>
        </tr>
    )
}


export default NewISPTableRow;