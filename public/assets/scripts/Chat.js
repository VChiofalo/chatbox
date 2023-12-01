export default class Chat{
    constructor(ui){
        this.socket = io.connect(document.location.host);
        this.ui = ui;
        this.listenWebSocketServer();
        this.listenLocalEvent();
    }

    listenWebSocketServer(){
        this.socket.on('server:user:exists', () => { this.ui.tryConnect(true) });
        this.socket.on('server:user:connected', this.ui.connecting.bind(this.ui));
        this.socket.on('server:user:disconnected', this.ui.disconnecting);
        this.socket.on('server:user:list', this.ui.listingUsers);
        this.socket.on('server:message:new', this.ui.addMessage);
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

        document.addEventListener("local:channel:switch", (e) => {
            this.socket.emit("client:channel:switch", e.detail.channel)
        })
    }
}