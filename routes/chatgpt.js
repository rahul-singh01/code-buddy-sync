import openai from 'openai';
import { ChatGPTAPI } from 'chatgpt'
import express, { application } from 'express';
import querystring from 'querystring';

const app = express.Router();

const apiKey = "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";

app.post('/chatgpt' , async (req, res) => {

    const {question} = req.body;
    console.log(question);
    try{
        const api = new ChatGPTAPI({
            apiKey
        })
        
        api.sendMessage(question).then((response)=>{
            let c = ""
            try{
                c = response.detail.choices[0].message.content.split('```')[1].split('```')[0]
            }catch(e){
                c = response.detail.choices[0].message.content
            }
            res.json({
                answer : encodeURIComponent(c)
            })
        })

    }catch(e){
        console.log("second error : " , e)
        res.json({
            answer : "Error Occured internally !"
        })
    }

})

export default app;

