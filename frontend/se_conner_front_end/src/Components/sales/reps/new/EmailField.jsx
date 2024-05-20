import React, {useEffect, useState} from "react";
import useHttp from "../../../../hooks/useHttp";


function EmailField({email, inputChange, valid, setValid}){
    const {httpRequest} = useHttp();
    
    
    useEffect(() => {

        if(email === ""){
            return;
        }

        const configRequest = {
            url: `api/v1/sales/reps/email/${email}`,
            method: "GET"
        }

        function applyData(res){
            
            setValid((prev)=>{
                return {...prev, email: res.data.data.length === 0}
            })
        }


        async function getHttp(){
            await httpRequest(configRequest, applyData)
        }


        const queryEmail = setTimeout(() => {
            getHttp()
        }, 1000)
        
        

        return () => {
            clearTimeout(queryEmail)
        }

    }, [email])

    return(
        <>
            <label>Email</label>
            <input type="email"
                    value={email}
                    name="email"
                    onChange={(e) => inputChange(e)}
            />
            <div className="error">
                    <p>{valid.email? "email in use" : ""}</p>
            </div>
        </>
    )
}

export default EmailField