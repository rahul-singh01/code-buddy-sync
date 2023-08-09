import React from 'react'
import "../../css/terminal.css"

const Terminal = ({output}) => {

  return (
    <div className="terminalwrapper">
        <p className="thead">Terminal</p>

        <div className="inputfield">
            <div className="inputbox">
                <p>Input</p>
                <textarea cols="30" rows="10"></textarea>
            </div>

            <div className="outputbox">
                <p>Output</p>
                <textarea value={output.output} cols="30" rows="10" readOnly></textarea>
                <p>Executed In : {output.runtime}s</p>
            </div>
        </div>
        
    </div>
  )
}

export default Terminal;