var scene;
var stat;
var state = document.getElementById("gameState");

// Init();

function Init(){
    state.innerHTML = 1;
    scene = new MyScene();
    scene.InitHierarchy();

    stat = InitStats();

    Update();
}

function Restart(){
    scene.RestartScene();
}

function InitStats() {

    var stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms

    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.getElementById("Stats-output").appendChild(stats.domElement);

    return stats;
}

function Update(){
    scene.Update();
    stat.update();

    requestAnimationFrame(Update);
}