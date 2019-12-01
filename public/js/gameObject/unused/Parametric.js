class Parametric extends GameObject{
    constructor(_data){
        super();
        this.data = _data;
        this.points = [];
        this.CreateMesh();
    }

    CreateMesh(){
        var _data = this.data;
        this.InitGeometry();
        this.InitMaterial();
        this.mesh = new THREE.SceneUtils.createMultiMaterialObject(this.geometry, [this.meshMaterial, this.wireFrameMat]);
        // this.mesh = new THREE.Mesh(this.geometry, this.material);
        // this.mesh = new THREE.Mesh(this.geometry, new THREE.MeshBasicMaterial({color: 0x3399ff}));
        this.mesh.position.copy(_data.position);
        this.mesh.scale.set(0.1, 0.1, 0.1);
        console.log(this.mesh);
    }

    sphere( u, v, target ) {
        size = 10;
		u *= Math.PI;
		v *= 2 * Math.PI;

		var x = size * Math.sin( u ) * Math.cos( v );
		var y = size * Math.sin( u ) * Math.sin( v );
		var z = size * Math.cos( u );

		target.set( x, y, z );

	}

    InitGeometry(){
        var _data = this.data;
        this.geometry = new THREE.ParametricGeometry(THREE.ParametricGeometries.mobius, _data.slices, _data.stacks);
        // this.geometry = new THREE.ParametricGeometries.SphereGeometry(10, _data.slices, _data.stacks);
    }

    InitMaterial(){
        this.meshMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00, transparent: true, opacity: 0.2});
        this.meshMaterial.side = THREE.DoubleSide;

        this.wireFrameMat = new THREE.MeshBasicMaterial();
        this.wireFrameMat.wireframe = true;

        this.material = new THREE.MeshPhongMaterial({
            specular: 0xaaaafff,
            color: 0x3399ff,
            shininess: 40
        });
        this.material.side = THREE.DoubleSide;
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