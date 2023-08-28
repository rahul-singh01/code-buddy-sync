import React from 'react'
import "../css/optionbox.css"

const Optionbox = ({chatdisplay , onReceiveDisplay , handleMyFile}) => {

    const handledisplay = ()=>{
        onReceiveDisplay(!chatdisplay);
    }

    return (
        <div className="optionboxwrapper">
            <div className="btncont">
                <button onClick={handledisplay} className='btn'>Chat</button>
                <button onClick={handleMyFile} value="false" className='btn'>MyFile</button>
                <button>Save File</button>
            </div>
        </div>
    )
}

export default Optionbox