import React, { useState } from 'react'
import "../../css/createfiles.css"
import Select from 'react-select';


const Folder = ({handleFolder})=>{
    return(
        <div className="filecont" >
            <div className="folderbody" onClick={handleFolder}>
                <span class="material-symbols-outlined">
                    folder
                </span>
                <textarea value="MyFiles    31-Aug-2023" cols="30" rows="10" readOnly></textarea>
                <span class="material-symbols-outlined">
                    expand_more
                </span>
            </div>
            <div className="folderfiles">
                    <div className="languagewrapper">
                        <div className="langcard">
                            <img src="https://seeklogo.com/images/P/python-logo-A32636CAA3-seeklogo.com.png" alt="" />
                            <p>Heap_Sort.py</p>
                        </div>
                        <div className="langcard">
                            <img src="https://seeklogo.com/images/P/python-logo-A32636CAA3-seeklogo.com.png" alt="" />
                            <p>main.py</p>
                        </div>
                        <div className="langcard">
                            <img src="https://seeklogo.com/images/P/python-logo-A32636CAA3-seeklogo.com.png" alt="" />
                            <p>Quick.py</p>
                        </div>
                        <div className="langcard">
                            <img src="https://seeklogo.com/images/P/python-logo-A32636CAA3-seeklogo.com.png" alt="" />
                            <p>Heap_Sort_jhgdjadyugjagjduygdudqu.py</p>
                        </div>
                    </div>
                </div>
            
        </div>
    )
}



const CreateFiles = () => {

    const [createMenuDisplay , setCreateMenuDisplay] = useState("none")

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

    const handleFolder= (e) => {
        if(e.currentTarget.parentElement.children[1].style.display == "none"){
            e.currentTarget.children[2].innerHTML = "expand_less"
            e.currentTarget.parentElement.children[1].style.display = "flex"
        }else{
            e.currentTarget.children[2].innerHTML = "expand_more"
            e.currentTarget.parentElement.children[1].style.display = "none"
        }
        
    }



    const handlecreatebtn = () =>{
        createMenuDisplay === "none" ? setCreateMenuDisplay("flex") : setCreateMenuDisplay("none")
    }

    const a = [1 , 2, 3, 4];

    return (
        <div className="createfilewrapper">
            <div className="searchbox">
                <input type="text" placeholder='Search files...' />
                <span class="material-symbols-outlined">search</span>
            </div>
            <div className="filesconsole">
                <h4>S: {`Myfiles > hello.py`}</h4>

                <div>

                    <div className="foldertype">
                        {
                            a.map((item)=>{
                                return <Folder key={item} handleFolder={handleFolder}/>
                            })
                        }
                    </div>

                </div>

            </div>
            <div onClick={handlecreatebtn} className="createitem">
                <span class="material-symbols-outlined">
                    add
                </span>
            </div>

            <div style={{display : createMenuDisplay}} className="createmenu">
                <div className="folder">
                    <span class="material-symbols-outlined">
                        folder
                    </span>
                    <p> : </p>
                    <input type="text" placeholder="Folder Name (optional)" />
                </div>

                <div className="folder">
                    <span class="material-symbols-outlined">
                        article
                    </span>
                    <p> : </p>
                    <input type="text" placeholder="File Name" />
                </div>

                <div className="folder">
                    <span class="material-symbols-outlined">
                        data_object
                    </span>
                    <p> : </p>
                    <Select className="selectboxfile"
                        options={options}
                        styles={customStyles}
                        placeholder="Select Coding Language"
                    />
                </div>

                <button> Done </button>

            </div>
        </div>
    )
}

export default CreateFiles;