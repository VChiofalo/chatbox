import User from './User.js';
import Message from './Message.js'
import Channel from './Channel.js'
import { Server, Socket } from "socket.io";

export default class Chat {
    constructor(httpServer){
        this.users = [];
        this.channels = [new Channel('Général'), new Channel('Programmation'),new Channel('Jeux Vidéo')];
        this.channels.attribut = [];
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

            socket.on('client:channel:switch',  this.onSwitchChannel.bind(this, socket))
        })
    }

    onUserConnect(socket, pseudo){
        let searchUser = this.users.filter((user) => user.pseudo == pseudo);
        if (searchUser.length > 0) {
            socket.emit('server:user:exists');
        } else {
            let user = new User(pseudo);
            this.users.push(user);
            socket.user = user;
            this.onSwitchChannel(socket, 'Général');
            socket.emit('server:user:connected', this.getChannelsList());
            this.io.emit('server:user:list', this.getUsersList());
        }
    }

    onUserDisconnect(socket){
        let indexUser = this.users.findIndex((user) => user.pseudo == socket.user.pseudo);
        if (indexUser) {
            this.users.splice(indexUser,1);  
        }
        socket.emit('server:user:disconnected');
        this.io.emit('server:user:list', this.getUsersList());
    }

    onMessageSend(socket, userMessage){
        const message = new Message(userMessage, socket.user.pseudo);
        this.getCurrentChannel(socket).setMessage(message);
        this.io.emit('server:message:new', message);
    }

    onSwitchChannel(socket, channel) {
        socket.join(channel);
        socket.user.setChannel(channel);
        socket.emit('server:message:list', this.getMessagesList(socket));
    }

    getUsersList() {
        return this.users.map(user => user.pseudo);
    }

    getChannelsList(){
        return this.channels.map(channel => channel.name);
    }

    getMessagesList(socket){
        return this.getCurrentChannel(socket).messages;
    }

    getCurrentChannel(socket){
        let currentChannel = this.channels.findIndex((channel) => channel.name == socket.user.channel);
        return this.channels[currentChannel];
    }
}