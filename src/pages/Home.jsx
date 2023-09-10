import React from 'react'
import "../css/home.css";

import { v4 as uuidv4 } from "uuid"
import { useState , useEffect } from 'react';
import {toast} from "react-hot-toast"
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [roomid , setRoomId] = useState("")
  const [username , setUsername] = useState("")
  const navigate = useNavigate();

  const createRoomID = (e) =>{
    const id = uuidv4().split("-")[0];
    toast.success("Created Room Successfully !")
    setRoomId(id);
  }

  const joinRoom = ()=>{
    if(!roomid || !username){
      toast.error("Room Id and Username cannot be empty")
      return;
    }
    //redirect
    navigate(`/editor/${roomid}` , {
      state : {
        username,
      }
    })


  }

  const handleInputEnter = (e)=>{
    if(e.code == "Enter"){
      joinRoom();
    }
  }

  return (
    <div className="homePageWrapper">
      <div className="formwrapper">
        <div className="imgcont">
          <img className="mainimage" src="/img/codesync.jpg" alt="" />
        </div>
        <div className="boxcont"> 
          <h1>Code Buddy Sync</h1>
          <div>
            <input className="inputbar" placeholder="Enter Meeting Id" type="text" value={roomid} onChange={(e)=> setRoomId(e.target.value)} onKeyUp={handleInputEnter}/>
          </div>
          <div>
            <input className="inputbar" type="text" onChange={(e)=> setUsername(e.target.value)} placeholder="Enter Name" onKeyUp={handleInputEnter}/>
          </div>
          <div className="formbtn">
            <button className="fbtn" onClick={joinRoom}>Join Room</button>
            <button className="fbtn" onClick={createRoomID}>Create Room</button>
          </div>
        </div>
      </div>
      <footer>
        <h4>Made with ❤ by Rahul Singh</h4>
      </footer>
    </div>
  )
}

export default Home