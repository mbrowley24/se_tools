import React, {useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import DataContext from "../../context/dataContext";

function ISPLink() {
    const {userdata, dispatchUser, FIELDS} = useContext(DataContext);

    useEffect(() => {
        dispatchUser({type: FIELDS.ADMIN, payload: true})
    }, [])

    return (
        <>
        {
            userdata.admin ? <Link to="/sales/isp">ISPs</Link> : null
        }
        </>
        
    )
}