import React from 'react'
import "../../css/login.css"
import jwt_decode from 'jwt-decode'
import { GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google';
import {toast} from "react-hot-toast"
import axios from 'axios';


const currentUrl = window.location.href;
// Extract parts of the URL
const urlObject = new URL(currentUrl);
const protocol = urlObject.protocol;
const hostname = urlObject.hostname;
const port = urlObject.port;


const Login = ({onlogin}) => {

    const handlelogin = async(credentials)=>{
        const data = await axios({
            method : 'POST',
            url : `${protocol}//${hostname}:${"5000"}/api/v1/login`,
            data : {
                credentials
            }
        })

        if(data.data.status){
            toast.success(data.data.message)
            localStorage.setItem('token' , data.data.token)
            onlogin(data.data.data);
        }else{
            toast.error(data.data.message)
        }

    }

  return (
        <div className="loginboxwrapper">
            <h3>Login</h3>

            <div className="autoauth">
                <GoogleOAuthProvider clientId="162454490993-1paid41r08k2e197j77gf7tv1smj5tka.apps.googleusercontent.com">
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        handlelogin(credentialResponse.credential);
                    }}
                    onError={() => {
                        toast.error("Login Failed")
                    }}
                />
                </GoogleOAuthProvider>
            </div>

            <h4 className="or-text">OR</h4>

            <div className="userpass">
                <input className="loginput" type="text" placeholder="Enter Username or Email" required/>
                <input className="loginput" type="password" placeholder="Enter Password" required/>
            </div>
            <button className="log-btn">Login</button>

        </div>
  )
}

export default Login