import React from 'react'
import "../css/optionbox.css"

const Optionbox = ({chatdisplay , onReceiveDisplay}) => {

    console.log(chatdisplay);
    const handledisplay = ()=>{
        onReceiveDisplay(!chatdisplay);
    }

    return (
        <div className="optionboxwrapper">
            <div className="btncont">
                <button onClick={handledisplay} className='btn'>Chat</button>
                <button className='btn'>Save</button>
            </div>
        </div>
    )
}

export default Optionbox