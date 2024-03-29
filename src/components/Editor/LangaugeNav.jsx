import React, { useEffect } from 'react'
import Select from 'react-select';
import { useState , memo} from 'react';
import '../../css/langnav.css'
import axios from 'axios'

const currentUrl = window.location.href;
// Extract parts of the URL
const urlObject = new URL(currentUrl);
const protocol = urlObject.protocol;
const hostname = urlObject.hostname;
const port = urlObject.port;




const LangaugeNav = ({onLangChange , onThemeChange , code , onTerminalOutput ,gptTerminalcode , workspace , personalTerminalCode, terminalRef}) => {
    // const options = [
    //     { value: 'javascript', codevalue: 'javascript', label: 'JavaScript' , apiLabel : 'nodejs'},
    //     { value: 'cpp', codevalue: 'text/x-csrc' , label: 'C++' , apiLabel : 'cpp'},
    //     { value: 'c', codevalue: 'text/x-csrc', label: 'C'  , apiLabel : 'c'},
    //     { value: 'python', codevalue: 'python', label: 'Python' , apiLabel: 'python3' }
    // ];
    const options = [
        { value: 'javascript', codevalue: 'javascript', label: 'JavaScript' , apiLabel : 'nodejs' ,ext: 'js'},
        { value: 'cpp', codevalue: 'text/x-csrc' , label: 'C++' , apiLabel : 'c_cpp', ext: 'cpp'},
        { value: 'c', codevalue: 'text/x-csrc', label: 'C'  , apiLabel : 'c', ext: 'c'},
        { value: 'python', codevalue: 'python', label: 'Python' , apiLabel: 'python', ext: 'py'}
    ];
    const theme_options = [
        { value: 'dracula', label: 'Dracula' },
        { value: 'material', label: 'Material' },
        { value: 'monokai', label: 'Monokai' },
        { value: 'solarized', label: 'Solarized' }
    ];

    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [themeselectedOption, setthemeSelectedOption] = useState(theme_options[0]);

    const handleChange = (selectedOption) => {
        onLangChange(selectedOption);
        setSelectedOption(selectedOption);
    };

    const themehandleChange = (themeselectedOption) => {
        onThemeChange(themeselectedOption);
        setthemeSelectedOption(themeselectedOption);
    };

    const runcode = async() => {
        console.log(workspace , selectedOption)
        let terminalcode = ""
        if(workspace == "chatgpt"){
            terminalcode = gptTerminalcode
        }
        if(workspace == "collaborative"){
            terminalcode = code
        }
        if(workspace == "personal"){
            terminalcode = personalTerminalCode
        }

        console.log(terminalcode)

        terminalRef.current.setCode(terminalcode)
        terminalRef.current.setExt(selectedOption.ext)
        terminalRef.current.execute()

        console.log('after terminalref');


        const targetElement = document.querySelector('.terminalwrapper');
        targetElement.scrollIntoView({ behavior: 'smooth' });

        // let startTime = new Date();
        // const data = await axios({
        //     method : 'POST',
        //     // url : `${protocol}//${hostname}:${"5000"}/compiler/${selectedOption.apiLabel}`,
        //     url : `http://localhost:5000/compiler/${selectedOption.apiLabel}`,
        //     headers : {
        //         'Content-Type' : 'application/x-www-form-urlencoded'
        //     },
        //     data : {
        //         terminalcode
        //     }
        // })
        // let endTime = new Date();
        // let timeElapsed = ((endTime - startTime)/1000).toFixed(2);
        // onTerminalOutput({
        //     output : data.data.output,
        //     runtime : timeElapsed
        // })
        
    }

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxShadow: state.isFocused ? '0 0 0 3px #2196F3' : null,
            '&:hover': {
                border: '1px solid #aaa'
            }
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#2196F3' : 'white',
            color: state.isSelected ? 'white' : 'black',
            '&:hover': {
                backgroundColor: '#2196F3',
                color: 'white'
            }
        })
    };


    return (
        <div className="langaugenav">
            <Select className="selectbox"
                options={options}
                value={selectedOption}
                onChange={handleChange}
                styles={customStyles}
                placeholder="Select Coding Language"
            />
            <Select className="selectbox"
                options={theme_options}
                value={themeselectedOption}
                onChange={themehandleChange}
                styles={customStyles}
                placeholder="Select Theme"
            />
            <button onClick={runcode} className="runcode">Run Code</button>
      </div>
    )
}

export default LangaugeNav;
// export default LangaugeNav;