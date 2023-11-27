import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io.connect(document.location.host);
document.querySelector("#button_test").addEventListener('click', () => {
    socket.emit('message',`Message test pour le serveur`);
});