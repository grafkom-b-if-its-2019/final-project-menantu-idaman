class GameObject{
    constructor(){
        this.parent = null;
        this.children = [];
        this.component = [];
    }

    get Mesh(){
        return this.mesh;
    }

    get Body(){
        return this.body;
    }
}