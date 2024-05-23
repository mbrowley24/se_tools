import React, {useState} from "react";
import CompanyNameCell from "./CompanyNameCell";




function CompanyTableRow({data}){
    const [name, setName] = useState("");

    function inputChange(e){
        const {value} = e.target;
        setName(value);
    }

    return(
        <tr>
            <CompanyNameCell value={name} inputChange={inputChange}/>
            <td>{data.Opportunities}</td>
            <td>{data.contacts}</td>
            <td>{data.won}</td>
            <td>{data.lost}</td>
            <td>{data.open}</td>
            <td>{data.updated}</td>
        </tr>
    )
}
export default CompanyTableRow;