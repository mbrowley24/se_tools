import React from "react";




function ISPService({data}){
    console.log(data)
    return(
        <div className="services">
            <h5 className="service_title">{data.name}</h5>
            <ul className="service_links">
                {data.services.map((service, index)=>{
                    return <li key={index}>
                        <a  className="link"
                            href={service.link}
                            target="_blank"
                        >
                            {service.name}
                        </a>
                    </li>
                })}
            </ul>
        </div>
    )
};
export default ISPService