import React, { useState } from 'react'
import '../css/editor.css'
import LangaugeNav from './Editor/LangaugeNav'
import CodeEditor from './Editor/CodeEditor'
import Terminal from './Editor/Terminal'
import { useRef } from 'react';
import PersonalCodeEditor from './Editor/PersonalCodeEditor'


const Editor = ({socketRef , roomId , onCodeChange}) => {
  const [lang , setLang] = useState("javascript");
  const [theme , settheme] = useState("dracula");
  const [code, setCode] = useState(null);
  const [output, setOutput] = useState("");
  const [workspace , setWorkspace] = useState("collaborative");



  let previousElement = null;
  const handleTerminalEvent = (e)=>{

    if (previousElement) {
      previousElement.style.border = "none";
      previousElement.style.backgroundColor = "rgb(146, 102, 48)"
    }

    if(e.target.value === "collaborative"){
      e.target.style.border = "2px solid #FC8EAC"
      e.target.style.backgroundColor = "rgb(193, 142, 80)"
      previousElement = e.target
      setWorkspace("collaborative")
    }

    if(e.target.value === "personal"){
      e.target.style.border = "2px solid #FC8EAC"
      e.target.style.backgroundColor = "rgb(193, 142, 80)"
      previousElement = e.target
      setWorkspace("personal")
    }
  }

  return (
    <div className="editorwrapper">

      <LangaugeNav onLangChange={(language)=>{
        setLang(language.codevalue);
      }} onThemeChange={(theme)=>{
        settheme(theme.value);
      }} code={code}
        onTerminalOutput={(terminal_output)=>{
          setOutput(terminal_output);
        }}
      />

      <div className="workspace">
        <div className="tab">
          <div className='tab-btn'>
            <button onClick={handleTerminalEvent} value="collaborative">+ Collaborative WorkSpace</button>
            <button onClick={handleTerminalEvent} value="personal">+ Personal WorkSpace</button>
          </div>
          

          <div className="message-space">
            <textarea value="You are in Collaborative Workspace Your Code Changes will appear to joined cients" id="" cols="30" rows="10" readOnly></textarea>
          </div>

        </div>
      </div>
      
      {
        workspace === "collaborative" ? (
          <CodeEditor socketRef={socketRef} roomId={roomId} onCodeChange={onCodeChange} editorLang={lang} theme={theme} ontrackcode={(trackcode)=>{
            setCode(trackcode);
          }}/>
        ) : (
          <PersonalCodeEditor/>
        )
      }
      
      <Terminal output={output}/>
    </div>
  )
}

export default Editor; 