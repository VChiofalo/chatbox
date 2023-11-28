import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
document.addEventListener('DOMContentLoaded', () => {
    
    const socket = io.connect(document.location.host);

    let btnCo = document.querySelector('#button_connexion');
    let chat = document.querySelector('#chat')

    function connectByPseudo(exists){
        if (exists) {
            window.alert('Pseudo déjà attribué à un autre utilisateur !')
        }
        let user = window.prompt('Choisissez un pseudo : ')
        if (user !== null && user !== '') {
            socket.emit('client:user:pseudo', user);
        }
    }

    function connectToChat(){
        chat.classList.toggle('invisible');
        btnCo.classList.toggle('invisible');
    }
    
    btnCo.addEventListener('click', () => connectByPseudo(false));
    
    socket.on('server:user:exist', () => connectByPseudo(true));
    socket.on('server:user:connected', () => {
        console.log(':D');
        connectToChat();
    });
})