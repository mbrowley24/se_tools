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


    function handleSubmit(e){

        console.log(login)
        e.preventDefault();

        fetch('http://localhost:8080/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(login)
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
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