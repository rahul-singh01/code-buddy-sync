import express from 'express';
const app = express();
import cors from 'cors'

import expressWs from 'express-ws';
expressWs(app);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

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


// WebSocket route
app.ws('/ws', (ws, req) => {
    console.log('WebSocket connection opened');

    // Event listener for receiving messages from clients
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        // Send the received message back to the client
        ws.send(`Server received: ${message}`);
    });

    // Event listener for closing the connection
    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});


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

const port = process.env.PORT || 5001;
server.listen(port , ()=>{
    console.log('listening on port : ' , `http://localhost:${port}`);
});