import React from 'react'
import '../../css/codeEditor.css'

import { useEffect ,memo, useRef } from 'react'
import Codemirror from 'codemirror' 
import 'codemirror/lib/codemirror.css'

import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/python/python'
import 'codemirror/mode/clike/clike'

import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/search/search';
import 'codemirror/addon/search/searchcursor';


import 'codemirror/theme/dracula.css'
import 'codemirror/theme/material.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/solarized.css';



// import ACTIONS from "../../../src/Action'

const PersonalCodeEditor = () => {
    const editorRef = useRef(null);
  
    useEffect(() => {
      // Initialize CodeMirror instance when the component mounts
      const codeMirrorInstance = CodeMirror.fromTextArea(editorRef.current, {
        mode: 'javascript',
        theme: 'dracula',
        autoCloseTags: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        lineNumbers: true,
      });
  
      // Clean up CodeMirror instance when the component unmounts
      return () => {
        codeMirrorInstance.toTextArea(); // Detach CodeMirror instance from the textarea
      };
    }, []); // You might want to add dependencies if they change
  
    return <textarea ref={editorRef} id="personalEditor"></textarea>;
  };
  
  export default PersonalCodeEditor;