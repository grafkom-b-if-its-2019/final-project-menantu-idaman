class Circle extends GameObject{
    constructor(_data){
        super();
        this.data = _data;

        this.CreateMesh();
    }

    CreateMesh(){
        var _data = this.data;
        this.geometry = new THREE.CircleGeometry(_data.radius, _data.segments, _data.phiStart, _data.phiLen);
        this.material = new THREE.MeshNormalMaterial();
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.copy(_data.position);
    }

    Update(){
        
    }

    Translate(_position){
        this.mesh.position.add(_position);
    }
}