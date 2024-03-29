import React, { useState , useRef, useEffect } from 'react'
import "../css/editorPage.css"
import Editor from '../components/Editor'
import Chatbox from '../components/Chatbox'
import Optionbox from '../components/Optionbox'
import SaveFile from '../components/SaveFile'
import { initSocket } from '../socket'
import ACTIONS from '../Action'
import { useLocation } from 'react-router-dom'
import { useNavigate , Navigate , useParams} from 'react-router-dom'

import toast from 'react-hot-toast'


const Client = ({data})=>{
    return(
        <div className="clientavatar">
            <span><p>{data.username[0]}</p></span>
            <p>{data.username}</p>
        </div>
    )
}


const EditorPage = () => {
    const location = useLocation();
    const socketRef = useRef(null);
    const navigate = useNavigate();
    const {roomId} = useParams();
    const codeRef = useRef(null);

    const [chatdisplay , setChatDisplay] = useState(false);
    const [myfiledisplay , setmyFileDisplay] = useState("false");
    const [codeDB , setCodeDB] = useState("")

    const run = useRef(false)

    const [clients , setClients ] = useState([])

    useEffect(()=>{
        // if(run.current === true){
            const init = async ()=>{
                socketRef.current = await initSocket();
                socketRef.current.on('connect_error' , (err) => handleErrors(err));
                socketRef.current.on('connect_failed' , (err) => handleErrors(err)); 
    
                function handleErrors(e){
                    console.log(e)
                    toast.error("Socket Connection failed , try again later")
                    navigate("/");
                }
    
                socketRef.current.emit(ACTIONS.ACTIONS.JOIN , {
                    roomId,
                    username : location.state?.username
                });

                //listening for joined events
                socketRef.current.on(ACTIONS.ACTIONS.JOINED , ({clients , username , socketId})=>{
                    if(username !== location.state?.username){
                        toast.success(`${username} joined the room`);
                    }

                    setClients(clients);
                    socketRef.current.emit(ACTIONS.ACTIONS.SYNC_CODE , {
                        code : codeRef.current,
                        socketId
                    });

                })

                //listening for disconnected events

                socketRef.current.on(ACTIONS.ACTIONS.DISCONNECTED , ({username , socketId})=>{
                    toast.success(`${username} left the room`);
                    setClients((prev)=>{
                        return prev.filter(client => client.socketId !== socketId)
                    })

                })
    
            }
            init();

            return ()=> {
                socketRef.current.disconnect();
                socketRef.current.off(ACTIONS.ACTIONS.JOINED);
                socketRef.current.off(ACTIONS.ACTIONS.DISCONNECTED);
            }

        // }
        // return () => { // when component is unmounted
        //     run.current = true;
        // }
        
    },[])
    

    if(!location.state){
        return <Navigate to="/" />
    }

    const copyroomid = async()=>{
        try{
            await navigator.clipboard.writeText(roomId)
            toast.success("Room Id Copied Successfully to ClipBoard")
        }catch(err){
            toast.error(err);
        } 
    }

    const leaveroom = ()=>{
        toast.success("leaveroom Successfully")
        navigate("/");
    }

    return (
        <div className="mainwrapper">

            <div className="leftbox">

                <div className="companyname">
                    <img className="elogo" src="/img/favicon.ico" alt="" />
                    <p>Code Buddy Sync</p>
                </div>
                <hr className="line1"/>
                <h3>Connected Participants : {clients.length} </h3>
 
                <div className="clientlist">
                    {
                        clients.map((client) =>(
                            <Client key={client.socketId} data={client}/>
                        ))
                    }

                </div>

                <div className="leftbottombox">
                    <button className="cpybtn" onClick={copyroomid}>Copy Room ID</button>
                    <button className="leavebtn" onClick={leaveroom}>LeaveRoom</button>
                </div>
                
            </div>
            <div className="editorbox">
                <Editor getCodeDB={codeDB} socketRef={socketRef} roomId={roomId} onCodeChange={(code)=>{
                    codeRef.current = code;
                }}/>
            </div>
            
            <Optionbox chatdisplay={chatdisplay} onReceiveDisplay={(receivedisplay)=>{
                setChatDisplay(receivedisplay);
            }}
            handleMyFile={(e)=>{
                e.target.setAttribute("value" , myfiledisplay)
                e.target.getAttribute("value") == "false" ? setmyFileDisplay("true") : setmyFileDisplay("false")
            }}
            />

            {
                chatdisplay ? (
                    <Chatbox socketRef={socketRef} roomId={roomId} username={location.state?.username} receivedisplay={chatdisplay} onDisplayChange={(change)=>{
                        setChatDisplay(change);
                    }}/>
                ) : (
                    <></>
                )
            }

            <SaveFile onDisplay={myfiledisplay} getCodeDB={(code)=>{
                setCodeDB(code)
            }}/>
           
            
        </div>
    )
}

export default EditorPage;