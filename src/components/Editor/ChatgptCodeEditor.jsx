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

import ACTIONS from "../../../src/Action"

const ChatgptCodeEditor = ({editorLang ,theme , getEditorRef3 , gptResponse , getGPTterminalcode}) => {
    console.log(gptResponse)
    const editorRef = useRef(null);
    useEffect(()=>{
        async function init(){
            editorRef.current = Codemirror.fromTextArea(
                document.getElementById("chatGptEditor"),{
                    mode : editorLang,
                    theme : theme,
                    autoCloseTags : true,
                    autoCloseBrackets : true,
                    matchBrackets : true,
                    lineNumbers : true,
                }
            );

            getEditorRef3(editorRef);
            
            editorRef.current.getWrapperElement().style.display = "none";
        
            editorRef.current.on('change' , (instance , changes)=>{
                const { origin } = changes;
                const code = instance.getValue();
                getGPTterminalcode(code);

                // console.log(code);

                // onCodeChange(code);
                // ontrackcode(code);
                // if(origin !== 'setValue'){
                //     socketRef.current.emit(ACTIONS.ACTIONS.CODE_CHANGE ,{
                //         roomId,
                //         code,
                //     }) 
                // }
                
            })
        }
        init();

        return () => {
            if (editorRef.current) {
                editorRef.current.toTextArea(); // Dispose of the CodeMirror instance
            }
        };

    },[editorLang,theme]);

    useEffect(()=>{
        editorRef.current.setValue(decodeURIComponent(gptResponse));
        getGPTterminalcode(editorRef.current.getValue());
    },[gptResponse])

    return <textarea id="chatGptEditor"></textarea>

}

export default ChatgptCodeEditor;
// export default CodeEditor;