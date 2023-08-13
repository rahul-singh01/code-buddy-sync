import { io } from "socket.io-client"

const currentUrl = window.location.href;
// Extract parts of the URL
const urlObject = new URL(currentUrl);
const protocol = urlObject.protocol;
const hostname = urlObject.hostname;

export const initSocket = async() => {

    console.log("initSocket")

    const options = {
            'force new connection': true,
            reconnectionAttempt: 'Infinity',
            timeout: 10000,
            transports: ['websocket']
    }

    return io(`${protocol}//${hostname}:${"5000"}/`, options)
}