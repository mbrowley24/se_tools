import React, {useEffect, useReducer, useState} from "react";
import {Link} from "react-router-dom";
import NewISPName from "./NewISPName";
import NewISPURL from "./NewISPURL";
import NewISPMaps from "./NewISPMaps";
import useISP from "../../../hooks/useISP";
import UpdateISP from "./UpdateISP";


function ISPTableRow({isp, dispatch}) {
    const [errors, setErrors] = useState({})
    const {initialState, ispReducer, ispUpdate, FIELDS} = useISP();
    const [ispData, dispatchIspData] = useReducer(ispReducer, initialState);

    useEffect(() => {
        if(isp){
            dispatchIspData({type: FIELDS.LOAD, payload: isp})
        
        }else{
        
            dispatchIspData({type: FIELDS.UPDATE})
        }

    }, [isp])

    function inputChange(e){
        const {value, name} = e.target;
        console.log(name, value)
        dispatchIspData({type: name, payload: value})
    }
    return(
        <tr>
            <NewISPName isp={ispData.isp} inputChange={inputChange} errors={errors} />
            <NewISPURL isp={ispData.isp} inputChange={inputChange} errors={errors} />
            <NewISPMaps isp={ispData.isp} inputChange={inputChange} errors={errors} />
            <td><Link to={"/"}>{ispData.isp.categories}</Link></td>
            <UpdateISP isp={isp}
                    ispData={ispData}
                    dispatch={dispatch}
                    />
        </tr>
    )
}

export default ISPTableRow;