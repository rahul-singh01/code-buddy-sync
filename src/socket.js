import {io} from "socket.io-client"
// import '../src/.env'

export const initSocket = async () =>{

    const options = {
        'force new connection' : true, 
        reconnectionAttempt : 'Infinity',
        timeout : 10000,
        transports : ['websocket']
    }
    // return io(process.env.REACT_APP_SERVER_URL, options)
    return io("http://localhost:5000", options)
}