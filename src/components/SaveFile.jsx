import { useEffect, useState } from 'react'
import '../css/savefile.css'
import CreateMember from './savefile/CreateMember'
import jwt_decode from 'jwt-decode'
import { toast } from 'react-hot-toast'
import CreateFiles from './savefile/CreateFiles'

const SaveFile = ({onDisplay}) => {
  const [authdata , setAuthData] = useState({});
  const localtoken = localStorage.getItem('token')
  const [logoutdisplay , setlogoutDisplay] = useState("none");
  const [display , setdisplay] = useState("none")

  useEffect(()=>{
    const localtoken = localStorage.getItem('token')
    if(localtoken){
      const a_data = jwt_decode(localtoken)
      a_data.image = a_data.picture
      setAuthData(a_data);
    }
  },[])


  const handleLogout = () => {
    setlogoutDisplay("none");
    localStorage.removeItem('token')
    setAuthData({});
    toast.success("Logout Successfully")
  }

  useEffect(()=>{
    if(onDisplay=="true"){
      setdisplay("flex")
    }else{
      setdisplay("none")
    }
  }, [onDisplay])
  
  return (
    <div style={{display : display}} className="sfwrapper">
      <div className="sfcont">
        <div className="sfnavchat">
          <div className="sfheading">
            <h4>CodeBuddySync</h4>
            <p>My Files</p>
          </div>
          <img className="accountimg" src={authdata.image ? authdata.image : "https://www.nicepng.com/png/full/138-1388174_login-account-icon.png" } alt="" onClick={()=>{
            logoutdisplay === "none" ? setlogoutDisplay("flex") : setlogoutDisplay("none")
          }} />
          
          <div style={{display : logoutdisplay}} className="logout">
            <button onClick={handleLogout}>Logout</button>
          </div>

          <button onClick={()=>{setdisplay("none")}}>Close</button>
        </div>
        
        <div className="boxarea">
          {
            authdata && localtoken ? (
              <CreateFiles/>
            ) : (
              <CreateMember onSavefileSignup={(data)=>{
                console.log("AuthData : " , data)
                setAuthData(data)
              }}/>
            )
          }
          
        </div>
      </div>
    </div>
  )
}

export default SaveFile;