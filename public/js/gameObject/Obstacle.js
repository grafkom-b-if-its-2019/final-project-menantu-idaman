class Obstacle extends Cube{
    name = "";

    constructor(data){
        super(data);
        this.speed = data.speed;
        this.name = data.name;
        this.scene = data.scene;
    }

    InitGeom(){
        var _data = this.data;
        this.geometry = new THREE.BoxGeometry(_data.width, _data.height, _data.depth);
    }

    InitMat(){
        var _data = this.data;
        var texture = new THREE.TextureLoader().load( 'js/gameObject/textures/crate.gif' );
        this.material = new THREE.MeshBasicMaterial({map: texture});
    }

    Update(){
        this.Move();

        this.position.copy(this.body.position);

        this.mesh.position.copy(this.position);
        this.mesh.quaternion.copy(this.body.quaternion);

        if(this.position.z > 5){
            this.RemoveObject();
        }
    }

    RemoveObject(){
        this.scene.RemoveObject(this.name, this.mesh, this.body);
    }

    Move(){
        this.body.velocity = this.speed;
    }

    get Name(){
        return this.name;
    }
}
