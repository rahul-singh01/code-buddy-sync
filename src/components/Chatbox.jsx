
import '../css/chatbox.css'
import { useState , React} from 'react';

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

const Person = ({message , username})=>{
  const currentTime = getCurrentTime()
  console.log(message , currentTime)
  return (
      <div className="person">
        <div className="personnav">
          <div className="personid">
            <span>
              <p>{username.toUpperCase()[0]}</p>
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


const Chatbox = ({onDisplayChange , receivedisplay , username}) => {

  const [message, setMessage] = useState();
  const [inputmessage , setInputMessage] = useState([]);

  const handledisplay = ()=>{
      onDisplayChange(!receivedisplay);
  }

  const handlechat = ()=>{
    console.log(message , inputmessage)
    setInputMessage([...inputmessage , message]);
  }

  return (
    <div className="chatboxwrapper" >
      <div className="chatboxcont">
        <div className="navchat">
          <div className="heading">
            <h4>CodeBuddySync</h4>
            <p>ChatBox</p>
          </div>
          <button onClick={handledisplay}>Close</button>
        </div>
        
        <div className="chattextarea">
          {
            inputmessage ? (
              inputmessage.map((message , index)=>(
                <Person key={index} message={message} username={username}/>
              ))
                
            ) : (
              <></>
            )
            
          }
          {/* <div className="person">
            <div className="personnav">
              <div className="personid">
                <span>
                  <p>R</p>
                </span>
                <p>Rahul Singh</p>
              </div>
              <p>14:16</p>
            </div>
            <div className="personmsg">
              <textarea className="textareacont" value="Hello guys i am doing well" id="" cols="30" rows="10" readOnly></textarea>
            </div>
          </div> */}
        </div>

        <div className="sendbox">
          <input onChange={(e)=> setMessage(e.target.value)} type="text" placeholder="send message" />
          <button onClick={handlechat}>send</button>
        </div>
      </div>
    </div>
  )
}

export default Chatbox;