import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import Input from "../form/TextField";
import Button from "../form/Button";
import '../../css/login.css'

function FormLogin({}){
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        username: "",
        password: ""
    });
    const {httpRequest} = useHttp();


    async function handleSubmit(e){

        console.log(login)
        e.preventDefault();

        const configRequest={
            method: "POST",
            url: "/api/v1/login",
            data: login
        }

        function applyData(res){
            console.log(res.cookies)
        }

        await httpRequest(configRequest, applyData);
    }

        


    return(
        <div className="login">
            <form onSubmit={handleSubmit}>
                <div>
                    <Input
                        className="input"
                        placeholder="Username"
                        type="text"
                        value={login.username}
                        onChange={(e)=>setLogin({...login, username: e.target.value})}
                        label="Username"
                    />
                </div>
                <div>
                    <Input
                        className="input"
                        placeholder="Password"
                        type="password"
                        value={login.password}
                        onChange={(e)=>setLogin({...login, password: e.target.value})}
                        label="Password"
                    />
                </div>
                <div className="submit">
                    <Button
                        className="button"
                        label="Login"
                    />
                </div>
            </form>
        </div>
    )
}

export default FormLogin;