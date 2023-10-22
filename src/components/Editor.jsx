import React, { useEffect, useState, useRef } from 'react'
import '../css/editor.css'
import LangaugeNav from './Editor/LangaugeNav'
import CodeEditor from './Editor/CodeEditor'
// import Terminal from './Editor/Terminal'
import PersonalCodeEditor from './Editor/PersonalCodeEditor'
import ChatgptCodeEditor from './Editor/ChatgptCodeEditor'
import ChatGptInput from './chatgpt/ChatGptInput'
import FileSaver from './Editor/FileSaver'

import Terminal from '../../terminal-api/client/src/Component/Terminal/Terminal'


const Editor = ({socketRef , roomId , onCodeChange , getCodeDB}) => {
  const editowrapperRef = useRef(null);
  const [lang , setLang] = useState("javascript");
  const [theme , settheme] = useState("dracula");
  const [code, setCode] = useState(null);
  const [output, setOutput] = useState("");
  const [gptResponse , setGPTResponse] = useState();
  const [terminalGPTcode, setTerminalGPTcode] = useState("");
  const [personalTerminalCode , setPersonalTerminalCode] = useState("");
  const [fsdisplay , Setfsdisplay] = useState("");


  const [display_of_gpt_inputbar , set_display_of_gpt_inputbar] = useState("none");
  const [workspace , setWorkspace] = useState();
  const [editorRef1 , SetEditorRef1] = useState(null);
  const [editorRef2 , SetEditorRef2] = useState(null);
  const [editorRef3 , SetEditorRef3] = useState(null);

  const [msgspace , setMsgSpace] = useState("You are in Collaborative Workspace Your Code Changes will appear to joined cients");

  const terminalRef = useRef(null)


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

    if(e.target.value === "chatgpt"){
      e.target.style.border = "2px solid #FC8EAC"
      e.target.style.backgroundColor = "rgb(193, 142, 80)"
      previousElement = e.target
      setWorkspace("chatgpt")
    }
  }

  useEffect(()=>{
    if(workspace == "personal"){
      editorRef1.current.getWrapperElement().style.display = "none";
      editorRef2.current.getWrapperElement().style.display = "block";
      editorRef3.current.getWrapperElement().style.display = "none";
      set_display_of_gpt_inputbar("none");
      setMsgSpace("You are in Personal Workspace , Code Changes will not appear to others.")
    }
    if(workspace == "collaborative"){
      editorRef1.current.getWrapperElement().style.display = "block";
      editorRef2.current.getWrapperElement().style.display = "none";
      editorRef3.current.getWrapperElement().style.display = "none";
      set_display_of_gpt_inputbar("none");
      setMsgSpace("You are in Collaborative Workspace Your Code Changes will appear to joined cients")
    }
    if(workspace == "chatgpt"){
      editorRef2.current.getWrapperElement().style.display = "none";
      editorRef1.current.getWrapperElement().style.display = "none";
      editorRef3.current.getWrapperElement().style.display = "block";
      set_display_of_gpt_inputbar("block");
      setMsgSpace("You are in ChatGpt Workspace Suggestion you will get from here.")
    }
  },[workspace])

  return (
    <div className="editorwrapper" ref={editowrapperRef}>

      <LangaugeNav terminalRef={terminalRef} 
        onLangChange={(language)=>{
          setLang(language.codevalue);
        }}
        onThemeChange={(theme)=>{
          settheme(theme.value);
        }} 
        code={code}
        onTerminalOutput={(terminal_output)=>{
          setOutput(terminal_output);
        }}
        gptTerminalcode={terminalGPTcode}
        workspace={workspace}
        personalTerminalCode={personalTerminalCode}
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

      
      {/* <FileSaver fsdisplay={fsdisplay} language={lang} workspace={workspace} collabcode={code} terminalGPTcode={terminalGPTcode} personalTerminalCode={personalTerminalCode}/> */}
      

      <CodeEditor getCodeDB={getCodeDB} socketRef={socketRef} roomId={roomId} onCodeChange={onCodeChange} editorLang={lang} theme={theme} ontrackcode={(trackcode)=>{
            setCode(trackcode);
        }}

        getEditorRef={(editor1)=>{
          SetEditorRef1(editor1);
        }}  

        getfsdisplay={(fsdisplay)=>{
          Setfsdisplay(fsdisplay)
        }}
        
        />
      <PersonalCodeEditor editorLang={lang} theme={theme} 

      getEditorRef2={(editor2)=>{
        SetEditorRef2(editor2);
      }}

      onPersonalTerminalCode={(code)=>{
        setPersonalTerminalCode(code);
      }}
      />

      <ChatgptCodeEditor editorLang={lang} theme={theme} gptResponse={gptResponse}

      getEditorRef3={(editor3)=>{
        SetEditorRef3(editor3);
      }}

      getGPTterminalcode={(code)=>{
        setTerminalGPTcode(code);
      }}
      />

      <ChatGptInput inputdisplay={display_of_gpt_inputbar} editowrapperRef={editowrapperRef}
      
      getGPTCodeEditor={(answer)=>{
        setGPTResponse(answer);
      }}
      />

      <Terminal ref={terminalRef} name={'name'}/>

    </div>
  )
}

export default Editor; 