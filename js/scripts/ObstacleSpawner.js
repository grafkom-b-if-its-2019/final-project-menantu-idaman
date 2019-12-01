class ObstacleSpawner extends GameBehavior{
    counter = 0;
    maxFrame = 144

    constructor(data){
        super(data);
        this.Start();
    }

    Start(){
        this.index = 0;
        var _data = this.data;
        var obj = this;
        this.spawnTimer = setInterval(this.Instantiate, 1000, _data.scene, _data.scale, _data.position, obj);    
    }

    Update(){

    }

    ClearInterval(){
        clearInterval(this.spawnTimer);
    }

    Instantiate(myScene, scale, position, object){
        var index = object.index;
        var stringName = "ObstacleClone" + index;

        var xPos = Math.floor(Math.random() * 3);

        if(xPos == 1){
            xPos = -2;
        }

        position.x = xPos;

        this.origin = new Obstacle({width: scale.x, height: scale.y, depth: scale.z, position: position, mass: 1, color: 0xff0000, speed: new CANNON.Vec3(0, 0, 30), friction: 0.0, name: stringName, scene: myScene});

        myScene.Hierarchy[stringName] = this.origin;

        myScene.Scene.add(this.origin.Mesh);
        myScene.World.add(this.origin.Body);
        
        object.index += 1;
    }
}