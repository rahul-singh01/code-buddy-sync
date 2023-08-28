import axios from 'axios';
import express from 'express';

const app = express.Router()
  
//   try {
//       const response = await axios.request(options);
//       console.log(response.data);
//   } catch (error) {
//       console.error(error);
//   }


app.post('/:langauge' , async(req,res)=>{
    console.log("hello")
    const langauge = req.params.langauge;
    try {
        const {code} = req.body;
        // const options = {
        //     method: 'POST',
        //     url: 'https://online-code-compiler.p.rapidapi.com/v1/',
        //     headers: {
        //       'content-type': 'application/json',
        //       'X-RapidAPI-Key': '0e0e1ae423msha5a4dc4b93fedb5p1d215fjsn550b1047924a',
        //       'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
        //     },
        //     data: {
        //       language : `${langauge}`,
        //       version: 'latest',
        //       code
        //     //   input: null
        //     }
        // };

        const options = {
            method: 'POST',
            url: 'https://code-compiler10.p.rapidapi.com/',
            headers: {
              'content-type': 'application/json',
              'x-compile': 'rapidapi',
              'Content-Type': 'application/json',
              'X-RapidAPI-Key': '0e0e1ae423msha5a4dc4b93fedb5p1d215fjsn550b1047924a',
              'X-RapidAPI-Host': 'code-compiler10.p.rapidapi.com'
            },
            data: {
              langEnum: [
                'php',
                'python',
                'c',
                'c_cpp',
                'csharp',
                'kotlin',
                'golang',
                'r',
                'java',
                'typescript',
                'nodejs',
                'ruby',
                'perl',
                'swift',
                'fortran',
                'bash'
              ],
              lang: langauge,
              code,
            //   input: ''
            }
        };
          
        const response = await axios.request(options);
    
        res.json({
            output : response.data.output,
            runtime : "0.05"
        });
    } catch (error) {
        res.json({
            output : error
        });   
    }

})

export default app;