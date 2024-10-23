import React from 'react';
import {Link} from "react-router-dom"




function CompanyAction({id}) {



    return(
        <td>
            <Link to={`/companies/${id}/appointments`}>
                <span className="material-symbols-outlined">
                    groups
                </span>
            </Link>
            <Link to={''}>
                <span className="material-symbols-outlined">
                    edit
                </span>
            </Link>
        </td>
    )
}

export default CompanyAction;