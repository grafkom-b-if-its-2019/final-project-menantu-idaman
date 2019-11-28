class ExtrudeSVG extends GameObject{
    constructor(_data){
        super();
        this.data = _data;
        this.CreateMesh();
    }

    CreateMesh(){
        var _data = this.data;
        this.InitGeometry();
        this.InitMaterial();
        // this.mesh = new THREE.SceneUtils.createMultiMaterialObject(this.geometry, [this.meshMaterial, this.wireFrameMat]);
        // this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh = new THREE.Mesh(this.geometry, new THREE.MeshBasicMaterial({color: 0x3399ff}));
        this.mesh.position.copy(_data.position);
        this.mesh.scale.x = 0.1;
        this.mesh.scale.y = 0.1;
    }

    InitShape(){
        var svgString = document.querySelector("#batman-path").getAttribute("d");
        this.shape = transformSVGPathExposed(svgString);
        console.log(this.shape);
    }

    InitGeometry(){
        this.InitShape();
        this.geometry = new THREE.ExtrudeGeometry(this.shape, this.data.setting);
    }

    InitMaterial(){
        this.meshMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00, transparent: true, opacity: 0.2});
        this.meshMaterial.side = THREE.DoubleSide;

        this.wireFrameMat = new THREE.MeshBasicMaterial();
        this.wireFrameMat.wireframe = true;

        this.material = new THREE.MeshPhongMaterial({color: 0x333333, shininess: 100});
    }

    Update(){
        
    }

    Translate(_position){
        this.mesh.position.add(_position);
    }

    Rotate(_rotation){
        this.mesh.rotation.y = _rotation;
        this.mesh.rotation.z = _rotation;
    }
}