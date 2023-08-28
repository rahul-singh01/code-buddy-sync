import React, { useEffect, useState } from 'react'
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
  const [workspace , setWorkspace] = useState();
  const [editorRef1 , SetEditorRef1] = useState(null);
  const [editorRef2 , SetEditorRef2] = useState(null);

  const [msgspace , setMsgSpace] = useState("You are in Collaborative Workspace Your Code Changes will appear to joined cients");



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

  useEffect(()=>{
    if(workspace == "personal"){
      editorRef1.current.getWrapperElement().style.display = "none";
      editorRef2.current.getWrapperElement().style.display = "block";
      setMsgSpace("You are in Personal Workspace , Code Changes will not appear to others.")
    }
    if(workspace == "collaborative"){
      editorRef2.current.getWrapperElement().style.display = "none";
      editorRef1.current.getWrapperElement().style.display = "block";
      setMsgSpace("You are in Collaborative Workspace Your Code Changes will appear to joined cients")
    }
  },[workspace])

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
            <button onClick={handleTerminalEvent} value="chatgpt">+ ChatGPT WorkSpace</button>
          </div>
          

          <div className="message-space">
            <textarea value={msgspace} id="" cols="30" rows="10" readOnly></textarea>
          </div>

        </div>
      </div>

      <CodeEditor socketRef={socketRef} roomId={roomId} onCodeChange={onCodeChange} editorLang={lang} theme={theme} ontrackcode={(trackcode)=>{
            setCode(trackcode);
        }}

        getEditorRef={(editor1)=>{
          SetEditorRef1(editor1);
        }}  
        
        />
      <PersonalCodeEditor editorLang={lang} theme={theme} 

      getEditorRef2={(editor2)=>{
        SetEditorRef2(editor2);
      }}
      />
      
      <Terminal output={output}/>
    </div>
  )
}

export default Editor; 