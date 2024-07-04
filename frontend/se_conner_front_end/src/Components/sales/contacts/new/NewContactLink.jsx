import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import useHttp from "../../../../hooks/useHttp";


function NewContactLink({data}){
    const [contactLimit, setContactLink] = useState(false);
    const {httpRequest} = useHttp();

    useEffect(()=>{
        if(!data) return

        const configRequest = {
            url: `api/v1/companies/${data.company.id}/contacts/limit`,
            method: "GET"
        }

        function applyData(res){

            if(res.status === 200){
                setContactLink(res.data);
            }
        }


        (async()=>{
            await httpRequest(configRequest, applyData);
        })()

    },[data]);

    return(
        <>
            { !contactLimit ?
                <Link to={`/sales/companies/${data.company.id}/contacts/new`}>New Contacts</Link>
                :
                <span>20 Contact Limit Reached</span>
            }
        </>
    )
};
export default NewContactLink;