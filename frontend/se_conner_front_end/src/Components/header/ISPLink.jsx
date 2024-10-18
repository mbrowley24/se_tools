import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/useHttp";
import { userActions } from "../../store/user";

function ISPLink() {
    const dispatch = useDispatch();
    const userdata = useSelector(state => state.userData)
    const {httpRequest} = useHttp();

    // useEffect(() => {
    //
    //     if(userdata.admin) return;
    //
    //     const configRequest = {
    //         url: "api/v1/users/isadmin",
    //         method: "GET"
    //     }
    //
    //     function applyData(res){
    //
    //         dispatch(userActions.setAdmin(res.data));
    //     }
    //
    //     (async()=>{
    //
    //         httpRequest(configRequest, applyData);
    //
    //     })();
    //
    // }, [])

    return (
        <>
        {
            userdata.admin ? <Link to={"/sales/isp"}>ISPs</Link> : null
        }
        </>
        
    )
}

export default ISPLink;