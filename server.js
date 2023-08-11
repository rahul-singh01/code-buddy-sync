import express from 'express';
const app = express();
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//Adding url encoders
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/' , express.static('dist'))

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


import compilerApi from './routes/compilerApi.js'

app.use('/compiler/' , compilerApi);


import http from 'http'
import {Server} from 'socket.io'

const server = http.createServer(app);
const io = new Server(server);

import ACTIONS from './src/Action.js';

const userSocketMap = {}

function getAllConnectedClients(roomId){
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId)=>{
        return{
            socketId,
            username : userSocketMap[socketId]
        }
    })
}

io.on('connection', (socket)=>{
    console.log('connection', socket.id);

    socket.on(ACTIONS.ACTIONS.JOIN , ({roomId , username})=>{
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        
        clients.forEach(({socketId}) => {
            io.to(socketId).emit(ACTIONS.ACTIONS.JOINED , {
                clients,
                username,
                socketId : socket.id
            })
        })

    })

    socket.on(ACTIONS.ACTIONS.CODE_CHANGE , ({roomId , code}) => {
        socket.in(roomId).emit(ACTIONS.ACTIONS.CODE_CHANGE , { code })

    })

    socket.on(ACTIONS.ACTIONS.SYNC_CODE , ({socketId , code}) => {
        io.to(socketId).emit(ACTIONS.ACTIONS.CODE_CHANGE , { code })
    })

    // socket.on(ACTIONS.ACTIONS.CHATCONNECTED , ({socketId , message}) => {
    //     socket.in(socketId).emit(ACTIONS.ACTIONS.CHATCONNECTED , { message })
    // })

    socket.on('disconnecting' , () => {
        const rooms = [...socket.rooms]
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.ACTIONS.DISCONNECTED , {
                socketId : socket.id,
                username : userSocketMap[socket.id],
            })
        })

        delete userSocketMap[socket.id];
        socket.leave();

    })

})

const port = process.env.PORT || 5000;
server.listen(port , ()=>{
    console.log('listening on port : ' , `http://localhost:${port}`);
});
