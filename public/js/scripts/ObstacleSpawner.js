class ObstacleSpawner extends GameBehavior {
    counter = 0;
    maxFrame = 144

    constructor(data) {
        super(data);
        this.Start();
    }

    Start() {
        this.index = 0;
        var _data = this.data;
        var obj = this;
        this.spawnTimer = setInterval(this.Instantiate, 1000, _data.scene, _data.scale, _data.position, obj);
    }

    Update() {

    }

    ClearInterval() {
        clearInterval(this.spawnTimer);
    }

    Instantiate(myScene, scale, position, object) {
        var gamble = Math.floor(Math.random() * 3);
        var speedX = document.getElementById("score").innerHTML;
        speedX = parseFloat(speedX);
        if(speedX < 30){
            speedX = 30;
        }

        if (gamble == 0) {
            var index = object.index;
            var stringName = "ObstacleClone" + index;

            var xPos = Math.floor(Math.random() * 3);

            if (xPos == 1) {
                xPos = -2;
            }

            position.x = xPos;

            this.origin = new Obstacle({ width: scale.x, height: scale.y, depth: scale.z, position: position, mass: 1, color: 0xff0000, speed: new CANNON.Vec3(0, 0, speedX), friction: 0.0, name: stringName, scene: myScene });

            myScene.Hierarchy[stringName] = this.origin;

            myScene.Scene.add(this.origin.Mesh);
            myScene.World.add(this.origin.Body);

            object.index += 1;
        }
        else if(gamble == 1){
            var xPos = Math.floor(Math.random() * 3);
            var xBruh = [0, 0];
            if (xPos == 0) {
                xBruh[0] = 0;
                xBruh[1] = 2;
            }
            else if (xPos == 1) {
                xBruh[0] = -2;
                xBruh[1] = 2;
            }
            else {
                xBruh[0] = -2;
                xBruh[1] = 0;
            }

            this.origin = [null, null]

            for (var i = 0; i < 2; i++) {
                var index = object.index;
                var stringName = "ObstacleClone" + index;

                position.x = xBruh[i];

                this.origin[i] = new Obstacle({ width: scale.x, height: scale.y, depth: scale.z, position: position, mass: 1, color: 0xff0000, speed: new CANNON.Vec3(0, 0, speedX), friction: 0.0, name: stringName, scene: myScene });

                myScene.Hierarchy[stringName] = this.origin[i];

                myScene.Scene.add(this.origin[i].Mesh);
                myScene.World.add(this.origin[i].Body);

                object.index += 1;
            }
        }
        else{
            var xBruh = [-2, 0, 2];

            this.origin = [null, null, null]

            for (var i = 0; i < 3; i++) {
                var index = object.index;
                var stringName = "ObstacleClone" + index;

                position.x = xBruh[i];

                this.origin[i] = new Obstacle({ width: scale.x, height: scale.y, depth: scale.z, position: position, mass: 1, color: 0xff0000, speed: new CANNON.Vec3(0, 0, speedX), friction: 0.0, name: stringName, scene: myScene });

                myScene.Hierarchy[stringName] = this.origin[i];

                myScene.Scene.add(this.origin[i].Mesh);
                myScene.World.add(this.origin[i].Body);

                object.index += 1;
            }
        }
    }
}