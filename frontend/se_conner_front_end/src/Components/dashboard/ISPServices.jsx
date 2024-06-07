import React from "react";
import ISPService from "./ISPService";


function ISPServices({data}){
    
    return(
        <div className="isp_services">
            <h5>{data.name}</h5>
            <ul>
                {
                    data.map((service, index)=>{
                        return <ISPService key={index} data={service}/>
                    })
                }
                {
                    data.length === 0 && <li>No services Listed </li>
                }
            </ul>
        </div>
    )
};
export default ISPServices