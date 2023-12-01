export default class Chat{
    constructor(ui){
        this.socket = io.connect(document.location.host);
        this.ui = ui;
        this.listenWebSocketServer();
        this.listenLocalEvent();
    }

    listenWebSocketServer(){
        this.socket.on('server:user:exists', () => { this.ui.tryConnect(true) });
        this.socket.on('server:user:connected', this.ui.connecting);
        this.socket.on('server:user:disconnected', this.ui.disconnecting);
        this.socket.on('server:user:list', this.ui.listingUsers);
        this.socket.on('server:message:send', this.sendingMessage);
        this.socket.on('server:message:list', this.ui.listingMessages);
        this.socket.on('server:channel:list', this.ui.listingChannels);
    }

    listenLocalEvent(){
        document.addEventListener('local:user:connect', (e) => {
            this.socket.emit('client:user:connect', e.detail.pseudo);
        })

        document.addEventListener('local:user:disconnect', () => {
            this.socket.emit('client:user:disconnect');
        })

        document.addEventListener('local:message:send', (e) =>{
            this.socket.emit('client:message:send', e.detail.userMessage);
        })
    }
}