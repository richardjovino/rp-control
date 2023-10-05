import React from "react";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


function Signin(){

    const [error, setError] =useState(false)
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async(e) =>{
        e.preventDefault();

        console.log(usuario,password)
        try{

            const response = await axios.post('http://34.204.93.4:8000/login',
            JSON.stringify({usuario,password}),
            {headers: {'Content-Type': 'application/json'}})
            const token = response.data.token
            Cookies.set('token', token);
            console.log(response.data);
            navigate("/home")
        }catch(error){
            if(!error?.response){
                setError('Erro ao acessar o servidor')
            }else if(error.response.status == 401){
                setError('Usuario ou senha inválidos')
            }
        }
    }
    return (
<div className="login-form-wrap">
            <h2>Login</h2>
            <form className="login-form">
                <input type="usuario" name="usuario" placeholder="Usuario" required
                onChange={(e) => setUsuario(e.target.value)}></input>
                <input type="password" name="password" placeholder="Password" required
                onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit" className="btn-login"
                onClick={(e) => handleLogin(e)}>Login</button>
            </form>
            <p>{error}</p>
        </div>
    );
}
export default Signin