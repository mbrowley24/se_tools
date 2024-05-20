import React from "react";
import {Link} from "react-router-dom";


function AddSalesRep({}){

    return(
        <div className="add_Rep">
            <Link to="/sales/reps/add" className="add_rep">Add Rep</Link>
        </div>
    )
}

export default AddSalesRep;