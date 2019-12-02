class Player extends Cube{
    speed = 10;
    xPoint = 2;
    moveRight = false;
    moveLeft = false;
    isMoving = false;
    playerPos = 0;
    socket = io();

    contactNormal = new CANNON.Vec3(); // Normal in the contact, pointing *out* of whatever the player touched
    upAxis = new CANNON.Vec3(0,1,0);
    onGround = true;
    jumpForce = 10;

    constructor(_data){
        super(_data);
        this.Start();
        this.scene = _data.scene;
    }

    Start(){
        document.addEventListener( 'keydown', this.OnKeyDown.bind(null, this), false );
        document.addEventListener( 'keyup', this.OnKeyUp.bind(null, this), false );

        this.body.addEventListener("collide", this.OnCollisionEnter.bind(null, this));

        this.socket.on("dir", this.Move(msg));
    }

    Move(dir){
        console.log(dir);
    }

    OnCollisionEnter(obj, event){
        var contact = event.contact;

        // contact.bi and contact.bj are the colliding bodies, and contact.ni is the collision normal.
        // We do not yet know which one is which! Let's check.
        if(contact.bi.id == obj.body.id){  // bi is the player body, flip the contact normal
            contact.ni.negate(obj.contactNormal);
        }
        else{
            obj.contactNormal.copy(contact.ni); // bi is something else. Keep the normal as it is
        }

        // If contactNormal.dot(upAxis) is between 0 and 1, we know that the contact normal is somewhat in the up direction.
        if(obj.contactNormal.dot(obj.upAxis) > 0.5){ // Use a "good" threshold value between 0 and 1 here!
            obj.onGround = true;
        }
        else{
            obj.scene.GameOver();
        }
    }
    
    Update(){
        if(this.isMoving){
            if(this.moveLeft && this.body.position.x <= (this.playerPos * this.xPoint)){
                this.body.velocity.x = 0;
                this.body.position.x = this.playerPos * this.xPoint;

                this.isMoving = false;
                this.moveLeft = false;
            }
            else if(this.moveRight && this.body.position.x >= (this.playerPos * this.xPoint)){
                this.body.velocity.x = 0;
                this.body.position.x = this.playerPos * this.xPoint;

                this.isMoving = false;
                this.moveRight = false;
            }
        }

        this.position.copy(this.body.position);

        this.mesh.position.copy(this.position);
        this.mesh.quaternion.copy(this.body.quaternion);
    }

    OnKeyDown(obj, event){
        switch( event.keyCode ) {

            case 38: // up
            case 87: // w
                if(obj.onGround){
                    obj.body.velocity.y = obj.jumpForce;
                    obj.onGround = false;
                }
                break;

            case 37: // left
            case 65: // a
                if(obj.playerPos > -1 && obj.isMoving == false){
                    obj.playerPos -= 1;

                    obj.body.velocity.x = obj.speed * -1;
                    obj.moveLeft = true;
                    obj.isMoving = true;
                }
                break;

            case 40: // down
            case 83: // s
                
                break;

            case 39: // right
            case 68: // d
                if(obj.playerPos < 1 && obj.isMoving == false){
                    obj.playerPos += 1;

                    obj.body.velocity.x = obj.speed;
                    obj.moveRight = true;
                    obj.isMoving = true;
                }
                break;

            case 32: // space
                break;
        }
    }

    OnKeyUp(obj, event){
        switch ( event.keyCode ) {

            case 38: // up
            case 87: // w
                
                break;

            case 37: // left
            case 65: // a
                // obj.body.velocity.x = 0;
                break;

            case 40: // down
            case 83: // s
                
                break;

            case 39: // right
            case 68: // d
                // obj.body.velocity.x = 0;
                break;

            case 32: // space

                break;
        }
    }
}