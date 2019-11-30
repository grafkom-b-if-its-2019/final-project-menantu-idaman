class Obstacle extends Cube{
    name = "";

    constructor(data){
        super(data);
        this.speed = data.speed;
        this.name = data.name;
    }

    Update(){
        this.Move();

        this.position.copy(this.body.position);

        this.mesh.position.copy(this.position);
        this.mesh.quaternion.copy(this.body.quaternion);
    }

    Move(){
        this.body.velocity = this.speed;
    }

    get Name(){
        return this.name;
    }
}