import React, { useState } from 'react'
import '../../css/createmember.css'

import Login from './Login'
import Signup from './Signup'

const CreateMember = ({onSavefileSignup}) => {

  const [memtype , setMemtype] = useState('login')

  const handlememtype = ()=>{
    memtype == 'login' ? setMemtype('signup') : setMemtype('login');
  }
  return (
    <div className="memwrapper">
      <div className="membox">
        <button onClick={handlememtype}>Login / SignUp</button>
      </div>
      <p>Looks like your are not logged in 👀</p>
      <div className="boxwrapper">
        {
          memtype === "login" ? (
            <Login onlogin={(data)=>{
              onSavefileSignup(data)
            }}/>
          ) : (
            <Signup onSignup={(data)=>{
              onSavefileSignup(data);
            }}/>
          )
        }
        
      </div>
    </div>
  )
}

export default CreateMember;