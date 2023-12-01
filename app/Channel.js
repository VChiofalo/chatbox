export default class Channel{
    constructor(name){
        this.name = name;
        this.messages = [];
    }

    setMessage(message){
        this.messages.push(message);
    }
}