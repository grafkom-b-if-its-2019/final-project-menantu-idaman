class MyScene{
    camFOV = 60;
    camNearClip = 0.1;
    camFarClip = 1000;
    hierarchy = {};
    timeStep = 1/60;
    isGameOver = false;

    constructor(){
        this.InitScene();
        this.InitWorld();

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.renderer.domElement);
    }

    InitScene(){
        this.scene = new THREE.Scene();
        
        this.mainCamera = new THREE.PerspectiveCamera(this.camFOV, window.innerWidth/window.innerHeight, this.camNearClip, this.camFarClip);
        this.camPos = new THREE.Vector3();
        this.camPos.set(0, 2, 10);

        this.sun = new THREE.DirectionalLight(0xffffff);
        this.sun.position.set(10, 30, 10);
        this.sun.lookAt(0, 0, 0);
        this.sun.castShadow = true;
        this.sun.intensity = 1;
        this.scene.add(this.sun);
    }

    InitWorld(){
        this.world = new CANNON.World();

        this.world.gravity.set(0, -30, 0);
        this.world.broadphase = new CANNON.NaiveBroadphase();
        this.world.solver.iterations = 10;
    }

    InitHierarchy() {
        this.hierarchy["Player"] = new Player({width: 1, height: 1, depth: 1, position: new THREE.Vector3(0, 0, 0), mass: 1, color: 0xff0000, friction: 0.0, scene: this});
        this.hierarchy["Ground"] = new Cube({width: 6, height: 0.5, depth: 100, position: new THREE.Vector3(0, -1, -45), mass: 0, color: 0x1f1f1f, friction: 0.0});

        this.hierarchy["ObstacleSpawner"] = new ObstacleSpawner({scene: this, scale: new THREE.Vector3(1, 1 ,1), position: new THREE.Vector3(2, - 0.25, -90), friction: 0.0});
        
        for(var key in this.hierarchy){
            var obj = this.hierarchy[key];
            if(obj.Mesh != undefined){
                this.scene.add(obj.Mesh);
                this.world.add(obj.Body);
            }
        }
    }

    translateRate = new THREE.Vector3(0.01,0,0);
    rotateRate = 0.01;

    Update(){
        if(!this.isGameOver){
            this.mainCamera.position.copy(this.camPos);
            
            this.rotateRate += 0.01;

            for(var key in this.hierarchy){
                var obj = this.hierarchy[key];
                obj.Update();
            }

            this.world.step(this.timeStep);
            this.renderer.render(this.scene, this.mainCamera);
        }
        else{
            this.RestartScene();
        }
    }

    get Hierarchy(){
        return this.hierarchy;
    }

    get Scene(){
        return this.scene;
    }

    get World(){
        return this.world;
    }

    RemoveObject(_name, _mesh, _body){
        this.scene.remove(_mesh);
        this.world.remove(_body)
        delete this.hierarchy[_name];
    }

    GameOver(){
        this.isGameOver = true;
    }

    RestartScene(){
        for(var key in this.hierarchy){
            var obj = this.hierarchy[key];
            if(key == "ObstacleSpawner"){
                obj.ClearInterval();
            }
            if(obj.Mesh != undefined){
                this.scene.remove(obj.Mesh);
                this.world.remove(obj.Body);
                delete this.hierarchy[key];
            }
        }

        this.InitHierarchy();
        
        this.isGameOver = false;
    }
}