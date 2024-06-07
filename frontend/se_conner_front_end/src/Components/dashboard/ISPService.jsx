import React from "react";




function ISPService({data}){

    return(
        <li>
            <a  className="link"
                href={data.url}
                target="_blank"
            >
                {data.name}
            </a>
        </li>
    )
};
export default ISPService