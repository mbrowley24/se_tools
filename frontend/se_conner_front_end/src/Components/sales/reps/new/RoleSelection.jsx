import React, {useEffect, useState} from "react";
import useHttp from "../../../../hooks/useHttp";



function RoleSelection({inputChange, data, validIsRole}){
    const {httpRequest} = useHttp();
    const [roles, setRoles] = useState([]);

    useEffect(() => {

        const config = {
            url: "api/v1/sales/roles",
            method: "GET",
        }

        function applyData(res){


            if(res.status === 200){
                
                if(res.data.data){
                    setRoles(res.data.data)
                }
            }
        }

        (async() => {

            await httpRequest(config, applyData)
        })()

    },[])

    useEffect(() => {

        const valid = roles.filter(role => role.value === data);
        validIsRole((prev) =>{
            return {...prev, role: valid.length > 0}
        })
    }, [data])

    return(
        <>
            <label>Roles</label>
            <select name="role"
                value={data}
                onChange={(e) => inputChange(e)}
            >
                <option value="">Select Role</option>
                {
                    roles.map((role, index) => {
                        return <option key={index} value={role.value}>{role.name}</option>
                    })
                }
            </select>
        </>
    )
}

export default RoleSelection;