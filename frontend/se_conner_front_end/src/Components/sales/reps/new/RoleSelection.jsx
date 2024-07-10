import React, {useEffect, useState} from "react";
import useHttp from "../../../../hooks/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { salesRepActions } from "../../../../store/salesRep";

function RoleSelection({inputChange, data, validIsRole, label, edit}){
    const {httpRequest} = useHttp();
    const salesRoleData = useSelector(state => state.salesRepData);
    const dispatch = useDispatch();
    
    useEffect(() => {

        if(salesRoleData.roles.length > 0) return;

        const config = {
            url: "api/v1/salesRepRoles",
            method: "GET",
        }

        function applyData(res){

            if(res.status === 200){
                
                if(res.data){
                    dispatch(salesRepActions.setRoles(res.data));
                }
            }
        }

        (async() => {

            await httpRequest(config, applyData)
        })()

    },[])

    useEffect(() => {
        
        if(data !== ""){
            if(validIsRole){
                const valid = salesRoleData.roles.filter(role => role.value === data);
                validIsRole((prev) =>{
                    return {...prev, role: valid.length > 0}
                })
            }
        }

    }, [data])

    return(
        <>
            {label && <label>Roles</label>}
            <select name="role"
                value={data}
                disabled={!edit}
                onChange={(e) => inputChange(e)}
            >
                <option value="">Select Role</option>
                {
                    salesRoleData.roles.map((role, index) => {
                        return <option key={index} value={role.value}>{role.name}</option>
                    })
                }
            </select>
        </>
    )
}

export default RoleSelection;