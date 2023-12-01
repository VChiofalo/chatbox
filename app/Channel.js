export default class Channel{
    constructor(name){
        this.name = name;
        this.attribut;
    }

    setAttribut(attribut){
        this.attribut = attribut;
    }

    getAttribut(){
        return this.attribut;
    }
}