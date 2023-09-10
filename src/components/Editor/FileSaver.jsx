import React, { useEffect, useState , useRef} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

import '../../css/filesaver.css'

const langextension = (x)=>{
    const data = {
        "javascript": ".js",
        "python": ".py",
        "text/x-csrc" : ".cpp"
    }
    return data[x]
}

const FileSaver = ({language , collabcode , terminalGPTcode ,personalTerminalCode , workspace , fsdisplay}) => {
    
    const [folders , setFolders] = useState([])
    const [filename , setFileName] = useState("")
    const fswrapper = useRef();

    useEffect(()=>{
        console.log("getting display : " , fsdisplay)
        fswrapper.current.style.display = fsdisplay
    } , [fsdisplay])

    const handlefsdisplay = ()=> {

        if(fswrapper.current.style.display == "block"){
            fswrapper.current.style.display = "none"
        }
    }

    let filecode = ""
    if(workspace == "collaborative" || !workspace){
        filecode = collabcode
    }

    if(workspace == "personal"){
        filecode = personalTerminalCode
    }

    if(workspace == "chatgpt"){
        filecode = terminalGPTcode
    }

    const handleSavetodatabase = async(id)=>{
        try{
            const data = await axios({
                method : "POST",
                url : `http://localhost:5000/api/v1/addfile_to_folder/${localStorage.getItem('token')}`,
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                },
                data : {
                    folderid : id,
                    filename,
                    filecode,
                    extension : langextension(language),
                    language
                }
            })
            if(data.data.status){
                toast.success(data.data.msg)
            }else{
                toast.error(data.data.msg)
            }
        }catch(e){
            toast.error(e)
        }
    }

    useEffect(()=>{
        try{
            const fetchdata = async()=>{
                const data = await axios({
                    method : "GET",
                    url : `http://localhost:5000/api/v1/viewfolder/${localStorage.getItem("token")}/`
                })
                setFolders(data.data.data)
            }
            fetchdata();
            
        }catch(e){
            alert(e)
        }
    },[])

    return (
        <div className="fswrapper" ref={fswrapper} style={{display : "none"}}>
            <div className="fsheader">
                <div className="fsinputwrapper">
                    <span class="material-symbols-outlined">
                        code
                    </span>
                    <input type="text" placeholder="Untitled Program" onChange={(e)=> setFileName(e.target.value)} required/>
                    <div className="langtype">
                        <p>{langextension(language)}</p>
                    </div>
                </div>

                <span class="material-symbols-outlined fsclose" onClick={handlefsdisplay}>close</span>
            </div>
            
            <div className="fsline"></div>
            <div className="choosefolder">
                <p>Choose a Folder</p>
            </div>
            <div className="folderfield">
                <div className="folderlistids">
                    {
                        folders ? (
                            folders.map((item)=>{
                                return (
                                    <div key={item.folderid} className="foldercard" onClick={()=>handleSavetodatabase(item.folderid)}>
                                        <p>{item.foldername}</p>
                                    </div>
                                )
                            })
                        ) : (
                            <></>
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default FileSaver