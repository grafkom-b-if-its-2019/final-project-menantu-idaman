class Robot extends GameObject{
    constructor(_data){
        super(_data);
        this.scene = _data.scene;
        this.mesh = undefined;
        this.loaded = false;

        this.CreateMesh();
    }

    CreateMesh(){
        var loader = new THREE.GLTFLoader();
        loader.load("js/gameObject/robot/robot.glb", this.Handler.bind(null, this));
    }

    Handler(that, glb){
        var object = glb.scene.children[0];
        object.position.set(0, 0, -50);
        object.scale.set(1, 1, 1);
        that.mesh = object;
    }

    Update(){
        if(this.mesh != undefined && this.loaded == false){
            this.loaded = true;
            this.scene.Scene.add(this.mesh);
        }
    }
}