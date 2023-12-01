import User from './User.js';
import Message from './Message.js'
import Channel from './Channel.js'
import { Server, Socket } from "socket.io";

export default class Chat {
    constructor(httpServer){
        this.users = [];
        this.messages = [];
        this.channels = [new Channel('Général'), new Channel('Programmation'),new Channel('Jeux Vidéo')];
        this.io = new Server(httpServer);

        this.onConnect();
    }

    onConnect(){
        this.io.on('connection', (socket) => {
            
            socket.on('client:user:connect', this.onUserConnect.bind(this, socket));
            // Equivalent
            // socket.on('client:user:connect', (pseudo) => this.onUserConnect(socket, pseudo))
            socket.on('client:user:disconnect', this.onUserDisconnect.bind(this, socket));

            socket.on('client:message:send', this.onMessageSend.bind(this, socket));

            socket.on("disconnect", this.onUserDisconnect.bind(this, socket));
        })
    }

    onUserConnect(socket, pseudo){
        let searchUser = this.users.filter((user) => user.pseudo == pseudo);
        if (searchUser.length > 0) {
            socket.emit('server:user:exists');
        } else {
            socket.join('Général');
            let user = new User(pseudo);
            user.setChannel('Général')
            this.users.push(user);
            socket.user = user;
            socket.emit('server:user:connected', user.getChannel());
            this.io.emit('server:user:list', this.getUsersList());
            this.io.emit('server:channel:list', this.getChannelsList());
        }
    }

    onUserDisconnect(socket){
        this.users.splice(this.users.findIndex((user) => user.pseudo == socket.user.pseudo),1);
        socket.emit('server:user:disconnected');
        this.io.emit('server:user:list', this.getUsersList());
    }

    onMessageSend(socket, userMessage){
        let message = new Message(userMessage, socket.user.pseudo);
        this.messages.push(message);
        socket.message = message;
        socket.emit('server:message:send');
        this.io.emit('server:message:list', this.getMessagesList());
    }

    getUsersList() {
        return this.users.map(user => user.pseudo);
    }

    getMessagesList() {
        return this.messages;
    }

    getChannelsList(){
        return this.channels.map(channel => channel.name)
    }
}