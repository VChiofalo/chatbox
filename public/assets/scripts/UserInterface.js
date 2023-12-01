export default class UserInterface{
    constructor(){
        document.addEventListener('DOMContentLoaded', () => {
            this.listenInterface();
        })
    }

    listenInterface(){
        // gestionnaire d'événement au clic afin de connecter l'utilisateur
        document.querySelector("#btnConnect").addEventListener('click',() => this.tryConnect(false));
        // gestionnaire d'événement au clic afin de déconnecter l'utilisateur
        document.querySelector("#btnDisconnect").addEventListener('click', () => { this.tryDisconnect() });
        // gestionnaire d'événement lors de l'appuie sur la touche entrer
        document.querySelector('#createMessage').addEventListener('keydown', this.sendingMessage);
    }

    tryConnect(exists) {
        if(exists) { 
            alert(`Ce pseudo est déjà utilisé par un autre utilisateur !`);
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

    connecting(channels){
        // afficher la liste des channels
        this.listingChannels(channels);

        // afficher l'interface du chat et masquer le bouton de connexion
        document.querySelectorAll('.not_authenticated').forEach((element) => {
            element.classList.add('hide');
        }) 
        document.querySelectorAll('.authenticated').forEach((element) => {
            element.classList.remove('hide');
        })
    }

    disconnecting(){  
        // masquer l'interface du chat et afficher le bouton de connexion
        document.querySelectorAll('.not_authenticated').forEach((element) => {
            element.classList.remove('hide');
        }) 
        document.querySelectorAll('.authenticated').forEach((element) => {
            element.classList.add('hide');
        }) 
    }

    listingUsers(users){
        // insert les utilisateurs dans une liste à partir d'un template html
        document.querySelector('#listingUsers').innerHTML = '';
        if ("content" in document.createElement("template")) {
            let template = document.querySelector("#usersTpl");
            users.forEach((user) => {
                let clone = document.importNode(template.content, true);
                clone.querySelector("li").textContent = user;
                document.querySelector('#listingUsers').appendChild(clone);
            })
        }
    }

    sendingMessage(event, pseudo){
        if (event.keyCode == 13) {
            let userMessage = document.querySelector('#createMessage').value;
            if(userMessage !== "") {
                // création d'un custom event
                const event = new CustomEvent("local:message:send", { detail: { userMessage } });
                // diffusion de l'événement au travers du document
                document.dispatchEvent(event);
                document.querySelector('#createMessage').value = '';
            }  
        } else {
            // création d'un custom event
            const event = new CustomEvent("local:message:typing", { detail: { pseudo } });
            // diffusion de l'événement au travers du document
            document.dispatchEvent(event);
        }
    }

    addMessage(userMessage){
        if ("content" in document.createElement("template")) {
            let template = document.querySelector("#messagesTpl");
            let clone = document.importNode(template.content, true);
            clone.querySelector('td.time').textContent = userMessage.date + ' - ';
            clone.querySelector('td.author').textContent = userMessage.user + ' :';
            clone.querySelector('td.message').textContent = ' '+ userMessage.message;
            document.querySelector('#listingMessages').appendChild(clone);
        }
    }

    listingChannels(channels){
        document.querySelector('#listingChannels').innerHTML = '';
        if ("content" in document.createElement("template")) {
            let template = document.querySelector("#channelsTpl");
            channels.forEach((channel) => {
                let clone = document.importNode(template.content, true);
                clone.querySelector('li').textContent = channel;
                clone.querySelector('li').addEventListener('click', this.switchChannel);
                document.querySelector('#listingChannels').appendChild(clone);
            })
        }
        document.querySelector('#listingChannels li').classList.add('active');
    }

    listingMessages(messages){
        document.querySelector('#listingMessages').innerHTML = '';
        messages.forEach(this.addMessage);
    }

    switchChannel(e) {
        let li = e.currentTarget;
        if (li.classList.contains('active') == false) {
            const event = new CustomEvent('local:channel:switch', { detail: { channel : li.textContent} });
            document.dispatchEvent(event);
            document.querySelector('#listingChannels li.active').classList.remove('active');
            li.classList.add('active');    
        }
    }
}