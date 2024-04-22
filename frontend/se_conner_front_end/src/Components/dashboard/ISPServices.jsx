import React from "react";
import ISPService from "./ISPService";


function ISPServices({data}){

    return(
        <div className="isp_services">
            {/* <h5>{data.name}</h5> */}
            {
                data.map((service, index)=>{
                    return <ISPService key={index} data={service}/>
                })
            }
            
        </div>
    )
};
export default ISPServices