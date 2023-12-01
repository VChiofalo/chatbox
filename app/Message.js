export default class Message {

    constructor(message, user) {
        this.message = message;
        this.date = new Date().toLocaleString();
        this.user = user;
    }
}