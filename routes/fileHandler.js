import express from 'express';
import jwt_decode from 'jwt-decode'
import Folder from '../config/models/folder.js'
import User from '../config/models/user.js'
import Files from '../config/models/file.js'

const app = express.Router()

app.post('/createfolder/:token' , async(req,res)=>{

    var {token} = req.params
    let { folder } = req.body

    const credential = jwt_decode(token)

    const results = await User.exists({email : credential.email})
    if(results){
        try{
            const initFolder = new Folder({
                email: credential.email,
                folder_name: folder,
                ownerid : results._id.toString(),
                private : true,
                files : [],
            })

            const data = await initFolder.save()

            // Create a Date object from the updatedAt string
            const date = new Date(data.updatedAt.toString());

            // Define an array of month names to map month numbers to month names
            const monthNames = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];

            // Extract day, month, and year components
            const day = date.getUTCDate();
            const month = monthNames[date.getUTCMonth()];
            const year = date.getUTCFullYear();

            // Create the formatted date string
            const formattedDate = `${day}-${month}-${year}`;

            console.log(formattedDate); // Output: 9-Sep-2023


            let req_array = {
                folderid : data._id.toString(),
                foldername : folder,
                date : formattedDate,
            }

            if(data){
                const w = await User.updateOne({_id : data.ownerid} , { $push: { folderlist : req_array } } )
                res.json({
                    status : true,
                    msg : "Folder Created successfully"
                })
            }
            else{
                res.json({
                    status : false,
                    msg : "Folder  can't be created"
                })
            }

        }catch(e){
            console.log(e)
            res.json({
                status : false,
                msg : e
            })

        }
    }

})

app.get('/viewfolder/:token' , async(req,res)=>{
    const {token} = req.params
    const credential = jwt_decode(token)
    try{
        const data = await User.findOne({email : credential.email})
        res.json({
            status : true,
            data : data.folderlist
        })
    }catch(e){
        res.json({
            status : false,
        })
    }
})

app.post("/addfile_to_folder/:token" , async(req, res) => {
    const {token} = req.params
    const credential = jwt_decode(token)
    const {folderid , filename , filecode ,extension ,language} = req.body
    try{
        const userid = await User.findOne({email : credential.email})
        const init_file = new Files({
            email : credential.email,
            filename,
            ownerid : userid._id.toString(),
            private : true,
            language,
            extension,
            filecode,
            sharelist: [],
        })
        const data = await init_file.save()

        const req_array = {
            filename,
            extension,
            fileid : data._id.toString(),
        }
        await Folder.updateOne({_id : folderid} , {$push : {files : req_array}})
        res.json({
            status : true,
            msg : "successfully saved"
        })
    }catch(e){
        console.log(e)
        null
    }    
})

app.get('/viewfile_from_folder/:token/:folderid' , async(req,res)=>{
    const {token , folderid} = req.params
    const credential = jwt_decode(token)
    
    try{
        const data = await Folder.findOne({_id : folderid})
        res.json({
            result : data.files
        })
    }catch(e){
        null
    }
})

app.get("/file_catcher/:id" , async(req, res) => {
    const id = req.params.id
    try{
        const data = await Files.findOne({_id : id})
        res.json({
            code : data.filecode
        })

    }catch(e){
        res.json({
            status : false,
            msg : e
        })
    }
})


export default app;