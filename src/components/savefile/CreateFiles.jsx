import React from 'react'
import "../../css/createfiles.css"
import Select from 'react-select';

const CreateFiles = () => {
    const options = [
        { value: 'javascript', codevalue: 'javascript', label: 'JavaScript' , apiLabel : 'nodejs'},
        { value: 'cpp', codevalue: 'text/x-csrc' , label: 'C++' , apiLabel : 'cpp'},
        { value: 'c', codevalue: 'text/x-csrc', label: 'C'  , apiLabel : 'c'},
        { value: 'python', codevalue: 'python', label: 'Python' , apiLabel: 'python3' }
    ];
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
        <div className="createfilewrapper">
            <div className="searchbox">
                <input type="text" placeholder='Search files...' />
                <span class="material-symbols-outlined">search</span>
            </div>
            <div className="filesconsole">
                <h4>S: {`Myfiles > hello.py`}</h4>
                
            </div>
            <div className="createitem">
                <span class="material-symbols-outlined">
                    add
                </span>
            </div>
            <div className="createmenu">

                <div className="folder">
                    <span class="material-symbols-outlined">
                        folder
                    </span>
                    <input type="text" placeholder="Folder Name" />
                </div>

                <Select className="selectboxfile"
                    options={options}
                    styles={customStyles}
                    placeholder="Select Coding Language"
                />
            </div>
        </div>
    )
}

export default CreateFiles;