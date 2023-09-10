import React, { useEffect, useState } from 'react'
import axios from 'axios';

import '../../css/chatgptinput.css'

const ChatGptInput = ({inputdisplay , editowrapperRef , getGPTCodeEditor}) => {

  const [text , setText] = useState("");
  const [isDisabled, setisDisabled ] = useState(false)

  const handleInput = async()=>{
    setisDisabled(true);
    let time = 1;
    let interval = setInterval(()=>{
      getGPTCodeEditor(`ChatGpt generating your message , Please Wait... \n ongoing waiting time : ${time} seconds...`)
      time +=1;
    } , 1000);
    const data = await axios({
      method : "POST",
      url : `http://localhost:5000/api/v1/chatgpt`,
      headers : {
          'Content-Type' : 'application/x-www-form-urlencoded'
      },
      data : {
          question : text
      }
    })
    clearInterval(interval)
    getGPTCodeEditor(data.data.answer)
    setisDisabled(false)
  }

  const handleInputEnter = (e)=>{
    if(e.code == "Enter" && !isDisabled){
      handleInput();
    }
  }
    
  return (
    <div className="gptinputwrapper" style={{display : inputdisplay}}>
        <div className="gptcommandbar">
            <input onChange={(e)=> setText(e.target.value)} onKeyUp={handleInputEnter} type="text" placeholder='Ask Gpt What you want ?' disabled={isDisabled}/>
            <span class="material-symbols-outlined" onClick={handleInput}>
              north_east
            </span>
        </div>
    </div>
  )
}

export default ChatGptInput