import React from "react";



function ISPTitle({data}){

    return(
        <h2 className="isp_title">
            <a className="isp_links"  href={data.url}>{data.name.toUpperCase()}</a> 
            {
                data.maps && <a className="link"
                    href={data.maps}
                    target="_blank">
                    Network Maps
                </a>
            }
            
        </h2>
    )
}

export default ISPTitle