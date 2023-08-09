import React, { useState } from 'react'
import '../css/editor.css'
import LangaugeNav from './Editor/LangaugeNav'
import CodeEditor from './Editor/CodeEditor'
import Terminal from './Editor/Terminal'
import { useRef } from 'react';


const Editor = ({socketRef , roomId , onCodeChange}) => {
  const [lang , setLang] = useState("javascript");
  const [theme , settheme] = useState("dracula");
  const [code, setCode] = useState(null);
  const [output, setOutput] = useState("");

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


      <CodeEditor socketRef={socketRef} roomId={roomId} onCodeChange={onCodeChange} editorLang={lang} theme={theme} ontrackcode={(trackcode)=>{
        setCode(trackcode);
      }}/>



      <Terminal output={output}/>
    </div>
  )
}

export default Editor; 