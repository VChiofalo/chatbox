import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
document.addEventListener('DOMContentLoaded', () => {
    
    const socket = io.connect(document.location.host);

    let btnCo = document.querySelector('#btnConnect');
    let btnDco = document.querySelector('#btnDisconnect');
    let notAuth = document.querySelectorAll('.not_authenticated');
    let auth = document.querySelectorAll('.authenticated');

    function connectByPseudo(exists){
        if (exists) {
            window.alert('Pseudo déjà attribué à un autre utilisateur !');
        };
        let user = window.prompt('Choisissez un pseudo : ');
        if (user !== null && user !== '') {
            socket.emit('client:user:pseudo', user);
        };
    }

    function connectChat(){
        auth.forEach(element => {
            element.classList.remove('hide');
        });
        notAuth.forEach(element => {
            element.classList.add('hide');
        });
        window.alert('Vous êtes maintenant connecté au chat !');
    }

    function disconnectChat() {
        auth.forEach(element =>{
            element.classList.add('hide');
        });
        notAuth.forEach(element => {
            element.classList.remove('hide');
        })
        socket.emit('client:user:disconnect');
    }
    
    btnCo.addEventListener('click', () => connectByPseudo(false));
    
    socket.on('server:user:exist', () => connectByPseudo(true));

    socket.on('server:user:connected', () => {
        connectChat();
    });

    socket.on('server:users:connectedlist', (users) =>{  
        console.log(users);
        document.querySelector('#listingUsers').innerHTML = '';
        if ("content" in document.createElement('template')) {
            let template = document.querySelector('#usersTpl');
            users.forEach(user => {
                let clone = template.content.cloneNode(true);
                clone.querySelector("li").textContent = user
                document.querySelector('#listingUsers').appendChild(clone);
            });
        }
    });

    btnDco.addEventListener('click', disconnectChat);

})