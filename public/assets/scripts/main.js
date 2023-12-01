import Chat from './Chat.js'
import UserInterface from "./UserInterface.js";
const chat = new Chat(new UserInterface());

/* const socket = io.connect(document.location.host); */

/* function tryConnect(exists) {
    if(exists) { 
        alert(`Ce pseudo est déjà utilisé par un autre utilisateur !`)
    }
    let pseudo = window.prompt(`Choisissez un pseuso :`);
    if(pseudo !== null && pseudo !== "") {
        socket.emit('client:user:connect', pseudo)
    }
} */

/* function tryDisconnect() {
    socket.emit('client:user:disconnect')
} */

/* document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#btnConnect").addEventListener('click',() => tryConnect(false));

    document.querySelector("#btnDisconnect").addEventListener('click', () => { tryDisconnect(); })
}) */

/* socket.on('server:user:exists', () => { tryConnect(true) })
socket.on('server:user:connected', () => {  
    // afficher l'interface du chat et masquer le bouton de connexion
    document.querySelectorAll('.not_authenticated').forEach((element) => {
        element.classList.add('hide')
    }) 
    document.querySelectorAll('.authenticated').forEach((element) => {
        element.classList.remove('hide')
    }) 
})

socket.on('server:user:disconnected', () => {  
    // masquer l'interface du chat et afficher le bouton de connexion
    document.querySelectorAll('.not_authenticated').forEach((element) => {
        element.classList.remove('hide')
    }) 
    document.querySelectorAll('.authenticated').forEach((element) => {
        element.classList.add('hide')
    }) 
})

socket.on('server:user:list', (users) => {
    document.querySelector('#listingUsers').innerHTML = '';
    if ("content" in document.createElement("template")) {
        let template = document.querySelector("#usersTpl");
        users.forEach((user) => {
            let clone = document.importNode(template.content, true);
            clone.querySelector("li").textContent = user
            document.querySelector('#listingUsers').appendChild(clone);
        })
    }
}) */