import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
document.addEventListener('DOMContentLoaded', () => {
    
    const socket = io.connect(document.location.host);

    let btnCo = document.querySelector('#button_connexion');
    let chat = document.querySelector('#chat');

    function connectByPseudo(exists){
        if (exists) {
            window.alert('Pseudo déjà attribué à un autre utilisateur !');
        };
        let user = window.prompt('Choisissez un pseudo : ');
        if (user !== null && user !== '') {
            socket.emit('client:user:pseudo', user);
        };
    }

    function connectToChat(){
        chat.classList.remove('invisible');
        btnCo.classList.add('invisible');
        window.alert('Vous êtes maintenant connecté au chat !');
    }
    
    btnCo.addEventListener('click', () => connectByPseudo(false));
    
    socket.on('server:user:exist', () => connectByPseudo(true));
    socket.on('server:user:connected', () => {
        connectToChat();
    });
    socket.on('server:users:connectedlist', (users) =>{  
        console.log(users);
        document.querySelector('ul').innerHTML = '';
        if ("content" in document.createElement('template')) {
            let template = document.querySelector('#usersrow');
            users.forEach(user => {
                let clone = template.content.cloneNode(true);
                let li = clone.querySelector('li');
                li.textContent = user; 

                document.querySelector('ul').appendChild(clone);
            });
        }
    });
})