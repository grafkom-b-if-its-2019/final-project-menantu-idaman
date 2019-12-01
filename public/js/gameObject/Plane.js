class Plane extends GameObject{
    constructor(_data){
        super();
        this.data = _data;

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
        this.geometry = new THREE.PlaneGeometry(_data.width, _data.height, _data.widthSeg, _data.heightSeg);
    }

    InitMat(){
        var _data = this.data;
        this.material = new THREE.MeshPhongMaterial({color: _data.color});
    }

    CreateBody(){
        var _data = this.data;
        this.shape = new CANNON.Plane();
        this.body = new CANNON.Body({mass: _data.mass});
        this.body.addShape(this.shape);
        this.body.position.copy(_data.position);
    }

    Update(){
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);
    }

    Translate(_position){
        this.mesh.position.add(_position);
    }
}