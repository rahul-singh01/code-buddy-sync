import React from 'react'
import '../css/savefile.css'

const SaveFile = () => {
  return (
    <div className="sfwrapper">
      <div className="sfcont">
        <div className="sfnavchat">
          <div className="sfheading">
            <h4>CodeBuddySync</h4>
            <p>ChatBox</p>
          </div>
          <button onClick={handledisplay}>Close</button>
        </div>
        
        <div className="chattextarea" id="chat">
        </div>

        <div className="sendbox">
          <input onChange={(e)=> setMessage(e.target.value)} id="msginput" type="text" placeholder="send message" onKeyUp={handleInputEnter} />
          <button onClick={handlechat} >send</button>
        </div>
      </div>
    </div>
  )
}

export default SaveFile;