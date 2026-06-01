const menu = document.getElementById("menu");
const game = document.getElementById("game");
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
    menu.style.display = "none";
    game.style.display = "block";
    update(); // start the game loop
});


const player = document.getElementById("player");

let x = 600;
let y = 500;
const speed = 2;

const keys = {};
let lastDirection = "front";

document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

function update() {
    if (keys["ArrowLeft"]) {
        x -= speed;
        lastDirection = "left";
    }

    if (keys["ArrowRight"]) {
        x += speed;
        lastDirection = "right";
    }

    if (keys["ArrowUp"]) {
        y -= speed;
        lastDirection = "back";
    }

    if (keys["ArrowDown"]) {
        y += speed;
        lastDirection = "front";
    }

    if (lastDirection === "left") {
        player.src = "assets/character_s_left.png";
    } 
    else if (lastDirection === "right") {
        player.src = "assets/character_s_right.png";
    } 
    else if (lastDirection === "back") {
        player.src = "assets/character_s_back.png";
    } 
    else {
        player.src = "assets/character_s_front.png";
    }

    player.style.left = x + "px";
    player.style.top = y + "px";

    requestAnimationFrame(update);
}

update();