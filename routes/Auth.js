import axios from 'axios';
import express from 'express';
import jwt_decode from 'jwt-decode'
import User from '../config/models/user.js'

const app = express.Router()


app.post('/signup' , async(req ,res)=>{
    const {credentials} = req.body
    const credential = jwt_decode(credentials)

    const results = await User.exists({email : credential.email})
    if(results){
        res.json({
            status : false,
            message : "User Already Exists"
        })
    }else{
        try{
            const user = new User({
                username : credential.name,
                email : credential.email,
                password : credential.sub,
                account_verified : credential.email_verified,
                image : credential.picture,
                authenticated_by : "google-auth",
            })
            
            const data = await user.save()
            if(data){
                res.json({
                    status : true,
                    message : "User Created Successfully",
                    data : data,
                    token : credentials
                })
            }else{
                res.json({
                    status : false,
                    message : err
                })
            }

        }catch(err){
            res.json({
                status : false,
                message : err
            })
        }
        

    }
})


app.post('/login' , async(req, res) =>{
    try{
        const {credentials} = req.body
        const credential = jwt_decode(credentials)
        const results = await User.findOne({email : credential.email})
        console.log(results)
        if(results){
            res.json({
                status : true,
                message : "Logged in Successfully",
                data : results,
                token : credentials
            })
        }else{
            res.json({
                status : false,
                message : "Invalid credentials"
            })
        }

    }catch(err){
        res.json({
            status : false,
            message : err
        })
    }
})

export default app;