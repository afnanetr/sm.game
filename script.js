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
const speed = 3;

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

    // Sprite map for cleaner code
    const spriteMap = {
        "left": "character_s_left.png",
        "right": "character_s_right.png",
        "back": "character_s_back.png",
        "front": "character_s_front.png"
    };

    player.src = spriteMap[lastDirection];
    player.style.left = x + "px";
    player.style.top = y + "px";

    requestAnimationFrame(update);
}
