
import '../css/chatbox.css'
import { useState , React, useRef, useEffect} from 'react';
import ACTIONS from '../../src/Action'
import { initSocket } from '../socket';
import {toast} from "react-hot-toast"

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Format hours and minutes with leading zeroes if necessary
  const formattedHours = (hours < 10 ? '0' : '') + hours;
  const formattedMinutes = (minutes < 10 ? '0' : '') + minutes;

  const formattedTime = `${formattedHours}:${formattedMinutes}`;
  return formattedTime;
}

function getRandomHexColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const Person = ({message , username , dp_color})=>{
  const currentTime = getCurrentTime()
  return (
      <div className="person">
        <div className="personnav">
          <div className="personid">
            <span>
              <p style={{backgroundColor : dp_color}}>{username.toUpperCase()[0]}</p>
            </span>
            <p>{username}</p>
          </div>
          <p>{currentTime}</p>
        </div>
        <div className="personmsg">
          <textarea className="textareacont" value={message} id="" cols="30" rows="10" readOnly></textarea>
        </div>
    </div>
  )
}

const hex_colour = getRandomHexColor();

const Chatbox = ({onDisplayChange , receivedisplay , username , roomId}) => {
  // console.log('CHATBOX');

  const chatRef = useRef(null);
  const chatRefEffect = useRef(false);
  const [message, setMessage] = useState();
  const [inputmessage , setInputMessage] = useState([{
    name: "CodeBuddySync",
    time: getCurrentTime(),
    message : "Happy Coding !",
    dp_color : '#DA70D6'
  }]);

  useEffect(() => {
      const initializeSocket = async () => {
        const socket = await initSocket();
        chatRef.current = socket;
        console.log('lst lvl', chatRef.current);

        chatRef.current.on(ACTIONS.ACTIONS.RECEIVE_MESSAGE, ({message}) => {
          console.log('res run');
          // console.log("received msg : " , message)
          setInputMessage(prevMessages => [...prevMessages, message]);
        });
        console.log('res iniciated');
      };
      initializeSocket(); // Initialize the socket connection
      console.log('effect-abv', chatRef.current);


    return () => {
      console.log('effect', chatRef.current);
      if (chatRef.current) {
        console.log('unmounting socket');
        chatRef.current.disconnect();
      }
      // chatRefEffect.current = true;
    };

    
  }, []);


  useEffect(()=>{
    console.log('de: charRef', chatRef.current);
    if (chatRef.current) {
      console.log('Connecting res')
      // chatRef.current.on(ACTIONS.ACTIONS.RECEIVE_MESSAGE, ({message}) => {
      //   console.log('res run');
      //   // console.log("received msg : " , message)
      //   setInputMessage(prevMessages => [...prevMessages, message]);
      // });
      console.log("event listen");
    }
  }, [message])

  const handlechat = () => {
    const msg_schema = {
      name: username,
      time: getCurrentTime(),
      message,
      dp_color : hex_colour
    };

    setInputMessage(prevMessages => [...prevMessages, msg_schema]);
    
    // me
    // console.log()

    // Emit a message event
    chatRef.current.emit(ACTIONS.ACTIONS.SEND_MESSAGE, {
      roomId,
      message: msg_schema,
    });
    
    $("#msginput").val('');
  };


  const handledisplay = ()=>{
      onDisplayChange(!receivedisplay);
      console.log(inputmessage)
  }

  const handleInputEnter = (e)=>{
    if(e.code == "Enter"){
      handlechat();
    }
  }

  try{
    var element = document.getElementById("chat");
    
    // Create a MutationObserver to watch for changes in the chat box
    const observer = new MutationObserver(() => {
      element.scrollTop = element.scrollHeight;
    });

    // Configure the observer to watch for childList changes (when messages are added)
    observer.observe(element, { childList: true });
  }catch(e){
    null
  }
  

  return (
    <div className="chatboxwrapper">
      <div className="chatboxcont">
        <div className="navchat">
          <div className="heading">
            <h4>CodeBuddySync</h4>
            <p>ChatBox</p>
          </div>
          <button onClick={handledisplay}>Close</button>
        </div>
        
        <div className="chattextarea" id="chat">
          {
            inputmessage ? (
              inputmessage.map((msg , index)=>(
                <Person key={index} message={msg.message} dp_color={msg.dp_color} username={msg.name}/>
              ))
                
            ) : (
              <></>
            )
            
          }
        </div>

        <div className="sendbox">
          <input onChange={(e)=> setMessage(e.target.value)} id="msginput" type="text" placeholder="send message" onKeyUp={handleInputEnter} />
          <button onClick={handlechat} >send</button>
        </div>
      </div>
    </div>
  )
}

export default Chatbox;