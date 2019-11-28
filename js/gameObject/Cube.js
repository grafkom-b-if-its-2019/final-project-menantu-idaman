class Cube extends GameObject{
    constructor(_data){
        super();
        this.data = _data;
        this.position = new THREE.Vector3(this.data.position.x, this.data.position.y, this.data.position.z);

        this.CreateMesh();
        this.CreateBody();
    }

    CreateMesh(){
        this.InitGeom();
        this.InitMat();
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }

    InitGeom(){
        var _data = this.data;
        this.geometry = new THREE.BoxGeometry(_data.width, _data.height, _data.depth);
    }

    InitMat(){
        var _data = this.data;
        this.material = new THREE.MeshPhongMaterial({color: _data.color});
    }

    CreateBody(){
        var _data = this.data;
        this.shape = new CANNON.Box(new CANNON.Vec3(_data.width / 2, _data.height / 2, _data.depth / 2));
        this.body = new CANNON.Body({mass: _data.mass});
        this.body.addShape(this.shape);
        this.body.position.copy(this.position);
        this.fricMaterial = new CANNON.Material("SlipperyMat");
        this.fricMaterial.friction = _data.friction;
        this.body.material = this.fricMaterial;
    }

    Update(){
        this.position.copy(this.body.position);

        this.mesh.position.copy(this.position);
        this.mesh.quaternion.copy(this.body.quaternion);
    }

    get Position(){
        return this.position;
    }
}