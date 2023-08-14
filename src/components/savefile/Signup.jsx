import React, { useEffect, useState ,useNavigation} from 'react'
import "../../css/Signup.css"
import { GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google';
import jwt_decode from 'jwt-decode'
import { toast } from 'react-hot-toast';
import axios from 'axios';

const currentUrl = window.location.href;
// Extract parts of the URL
const urlObject = new URL(currentUrl);
const protocol = urlObject.protocol;
const hostname = urlObject.hostname;
const port = urlObject.port;




const Signup = ({onSignup}) => {
    const handlesignup = async(credentials)=>{
        const data = await axios({
            method : 'POST',
            url : `${protocol}//${hostname}:${"5000"}/api/v1/signup`,
            data : {
                credentials
            }
        })

        if(data.data.status){
            toast.success(data.data.message)
            localStorage.setItem('token' , data.data.token)
            onSignup(data.data.data);
        }else{
            toast.error(data.data.message)
        }

    }

  return (
    <div className="Signupboxwrapper">
        <h3>Signup</h3>

        <GoogleOAuthProvider clientId="162454490993-1paid41r08k2e197j77gf7tv1smj5tka.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={credentialResponse => {
                    handlesignup(credentialResponse.credential);
                }}
                onError={() => {
                    toast.error("SignUp Failed")
                }}
            />
        </GoogleOAuthProvider>

        <h4 className="or-text">OR</h4>
        
        <div className="userpass">
            <input className="Signupput" type="email" placeholder="Enter Email" required/>
            <input className="Signupput" type="text" placeholder="Enter Username" required/>
            <input className="Signupput" type="password" placeholder="Enter Password" required/>
        </div>
        <button className="log-btn">Signup</button>

    </div>
  )
}

export default Signup