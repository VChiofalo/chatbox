export default class UserInterface{
    constructor(){
        document.addEventListener('DOMContentLoaded', () => {
            this.listenInterface();
        })
    }

    tryConnect(exists) {
        if(exists) { 
            alert(`Ce pseudo est déjà utilisé par un autre utilisateur !`)
        }
        let pseudo = window.prompt(`Choisissez un pseuso :`);
        if(pseudo !== null && pseudo !== "") {
            // création d'un custom event
            const event = new CustomEvent("local:user:connect", { detail: { pseudo } });
            // diffusion de l'événement au travers du document
            document.dispatchEvent(event);
        }
    }

    tryDisconnect() {
        // création d'un custom event
        const event = new CustomEvent("local:user:disconnect");
        // diffusion de l'événement au travers du document
        document.dispatchEvent(event);
    }

    listenInterface(){
        // gestionnaire d'événement au clic afin de connecter l'utilisateur
        document.querySelector("#btnConnect").addEventListener('click',() => this.tryConnect(false));
        // gestionnaire d'événement au clic afin de déconnecter l'utilisateur
        document.querySelector("#btnDisconnect").addEventListener('click', () => { this.tryDisconnect(); })
        // gestionnaire d'événement lors de la fermeture de la page afin de déconnecter l'utilisateur
        // /window.addEventListener("beforeunload", () => { this.tryDisconnect(); })
        // gestionnaire d'événement lors de l'appuie sur la touche entrer
        document.querySelector('#createMessage').addEventListener('keydown', (e) =>{
            if (e.isComposing || e.keyCode === 13) {
                this.sendingMessage();
            }
        })

        document.querySelectorAll('#messagesTpl td').forEach(() =>{
            this.swapRoom();
        })
    }

    connecting(channel){
        // afficher l'interface du chat et masquer le bouton de connexion
        document.querySelectorAll('.not_authenticated').forEach((element) => {
            element.classList.add('hide')
        }) 
        document.querySelectorAll('.authenticated').forEach((element) => {
            element.classList.remove('hide')
        })
        alert('Vous êtes maintenant connecté au salon ' + channel);
        listingMessages();
    }

    disconnecting(){  
        // masquer l'interface du chat et afficher le bouton de connexion
        document.querySelectorAll('.not_authenticated').forEach((element) => {
            element.classList.remove('hide')
        }) 
        document.querySelectorAll('.authenticated').forEach((element) => {
            element.classList.add('hide')
        }) 
    }

    listingUsers(users){
        // insert les utilisateurs dans une liste à partir d'un template html
        document.querySelector('#listingUsers').innerHTML = '';
        if ("content" in document.createElement("template")) {
            let template = document.querySelector("#usersTpl");
            users.forEach((user) => {
                let clone = document.importNode(template.content, true);
                clone.querySelector("li").textContent = user
                document.querySelector('#listingUsers').appendChild(clone);
            })
        }
    }

    sendingMessage(){
        let userMessage = document.querySelector('#createMessage').value;
        if(userMessage !== null && userMessage !== "") {
            // création d'un custom event
            const event = new CustomEvent("local:message:send", { detail: { userMessage } });
            // diffusion de l'événement au travers du document
            document.dispatchEvent(event);
        }
    }

    listingMessages(userMessages, pseudo){
        document.querySelector('#listingMessages').innerHTML = '';
        if ("content" in document.createElement("template")) {
            let template = document.querySelector("#messagesTpl");
            userMessages.forEach((userMessage) => {
                let clone = document.importNode(template.content, true);
                clone.querySelector('.time').textContent = userMessage.date + ' - ';
                clone.querySelector('.author').textContent = userMessage.user + ' :';
                clone.querySelector('.message').textContent = ' '+ userMessage.message;
                document.querySelector('#listingMessages').appendChild(clone);
            })
        document.querySelector('#createMessage').value = '';
        }
    }

    listingChannels(channels){
        console.log(channels);
        document.querySelector('#listingChannels').innerHTML = '';
        if ("content" in document.createElement("template")) {
            let template = document.querySelector("#channelsTpl");
            channels.forEach((channel) => {
                let clone = document.importNode(template.content, true);
                clone.querySelector('li').textContent = channel;
                document.querySelector('#listingChannels').appendChild(clone);
            })

        }
    }

    swapRoom(){
        console.log('coucou');
        // création d'un custom event
        const event = new CustomEvent("local:room:switch", console.log({ detail: { chan } }));
        // diffusion de l'événement au travers du document
        document.dispatchEvent(event);
    }
}