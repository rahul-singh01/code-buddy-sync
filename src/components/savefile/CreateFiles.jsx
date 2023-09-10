import React, { useEffect, useState } from 'react'
import "../../css/createfiles.css"
import Select from 'react-select';
import axios from 'axios';
import toast from 'react-hot-toast';


const Folder = ({handleFolder , item})=>{
    return(
        <div className="filecont" >
            <div className="folderbody" onClick={handleFolder} data={item.folderid}>
                <span class="material-symbols-outlined">
                    folder
                </span>
                <textarea value={`${item.foldername}   ${item.date}`} cols="30" rows="10" readOnly></textarea>
                <span class="material-symbols-outlined">
                    expand_more
                </span>
            </div>
            <div className="folderfiles">
                    <div className="languagewrapper">
                        
                    </div>
                </div>
            
        </div>
    )
}

const filesid = []

const CreateFiles = ({getCodeFromDB}) => {

    const [createMenuDisplay , setCreateMenuDisplay] = useState("none");
    const [folderInput , setFolderInput] = useState("");
    const [folderlist , setFolderList] = useState([]);

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

    const fileCodeCatcher = async(id)=>{
        try{
            const data = await axios({
                method : "GET",
                url : `http://localhost:5000/api/v1/file_catcher/${id}`
            })
            getCodeFromDB(data.data.code)
        }catch (e) {
            alert(e)
        }
    }

    const extensionlogo = (x)=>{
        let data = {
            js : "/img/extension_logo/javascript.png",
            py : "/img/extension_logo/python.png",
            cpp : "/img/extension_logo/cpp.png",
            c : "/img/extension_logo/c.png"
        }
        return data[x.replace("." , "")]
    }

    const handleFolder= async(e) => {
        if(e.currentTarget.parentElement.children[1].style.display == "none"){
            e.currentTarget.children[2].innerHTML = "expand_less"
            e.currentTarget.parentElement.children[1].style.display = "flex"
        }else{
            e.currentTarget.children[2].innerHTML = "expand_more"
            e.currentTarget.parentElement.children[1].style.display = "none"
        }

        let folderid = e.currentTarget.parentElement.children[0].getAttribute("data")
        let parentElement = e.currentTarget.parentElement.children[1].children[0];
        try{
            const data = await axios({
                method : "GET",
                url : `http://localhost:5000/api/v1/viewfile_from_folder/${localStorage.getItem('token')}/${folderid}`
            })
            const temp = data.data.result
            if(temp.length > 0){
                temp.forEach((item)=>{
                    if(filesid.find((res)=> res == item.fileid)){
                        null
                    }else{
                        const newDiv = document.createElement("div");
                        newDiv.className = "langcard";
                        newDiv.onclick = ()=>{fileCodeCatcher(item.fileid)}
                        newDiv.setAttribute("key" , item.fileid);

                        const img = document.createElement("img");
                        img.src = extensionlogo(item.extension);
                        img.alt = "";

                        const p = document.createElement("p");
                        p.textContent = `${item.filename}${item.extension}`;

                        newDiv.appendChild(img);
                        newDiv.appendChild(p);

                        parentElement.appendChild(newDiv);
                        filesid.push(item.fileid);
                    }
                })
            }else{
                parentElement.innerHTML = ""
                const htmlToInsert = `
                <div class="langcard">
                    <p>This Folder Contains no file</p>
                </div>
                `;
                parentElement.insertAdjacentHTML("beforeend", htmlToInsert);

            }         
            
        }catch(e){
            console.log(e)
        }  
    }

    const handleFolderbtn = async()=>{
        try{
            const data = await axios({
                method : "POST",
                url : `http://localhost:5000/api/v1/createfolder/${localStorage.getItem('token')}`,
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                },
                data : {
                    folder : folderInput
                }
            })
            const res = data.data
            if(res.status){
                toast.success(res.msg)
            }else{
                alert(res.msg)
            }
            try{
                const data = await axios({
                    method : "GET",
                    url : `http://localhost:5000/api/v1/viewfolder/${localStorage.getItem("token")}/`
                })
                setFolderList(data.data.data)
            }catch(e){
                alert(e)
            }

        }catch(e){
            alert(e)
        }
    }

    const handlecreatebtn = () =>{
        createMenuDisplay === "none" ? setCreateMenuDisplay("flex") : setCreateMenuDisplay("none")
    }

    useEffect(()=>{
        const fetchdata = async()=>{
            try{
                const data = await axios({
                    method : "GET",
                    url : `http://localhost:5000/api/v1/viewfolder/${localStorage.getItem("token")}/`
                })
                setFolderList(data.data.data)
            }catch(e){
                alert(e)
            }
        }
        fetchdata()
    },[])

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
                            folderlist ? (
                                folderlist.map((item)=>{
                                    return <Folder key={item.folderid} handleFolder={handleFolder} item={item}/>
                                })
                            ) : (
                                <></>
                            )
                            
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
                    <input type="text" onChange={(e)=> setFolderInput(e.target.value)} placeholder="Folder Name (required)" />
                </div>

                {/* <div className="folder">
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
                </div> */}

                <button onClick={handleFolderbtn}> Done </button>

            </div>
        </div>
    )
}

export default CreateFiles;