export default class User {

    constructor(pseudo) {
        this.pseudo = pseudo;
        this.channel;
        
    }

    setChannel(channel){
        this.channel = channel;
        return this;
    }

    getChannel(){
        return this.channel;
    }
}