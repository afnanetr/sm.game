const menu = document.getElementById("menu");
const game = document.getElementById("game");
const startBtn = document.getElementById("startBtn");
const player = document.getElementById("player");

let x = 600;
let y = 500;
const speed = 5;

const keys = {};
let lastDirection = "front";
let isPicking = false;

startBtn.addEventListener("click", () => {
    menu.style.display = "none";
    game.style.display = "block";
    requestAnimationFrame(update);
});

document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

const spriteMap = {
    left: "character_s_left.png",
    right: "character_s_right.png",
    back: "character_s_back.png",
    front: "character_s_front.png"
};

const pickSpriteMap = {
    left: "character_pick_left.png",
    right: "character_pick_right.png",
    back: "character_pick_back.png",
    front: "character_pick.png"
};

function collectLetter(letter){

    if(isPicking) return;

    isPicking = true;

    player.src = pickSpriteMap[lastDirection];

    setTimeout(() => {
        letter.remove();
        isPicking = false;
        player.src = spriteMap[lastDirection];
    }, 1500);
}

function checkLetters(){

    document.querySelectorAll(".letter").forEach(letter => {

        const p = player.getBoundingClientRect();
        const l = letter.getBoundingClientRect();

        if(
            p.left < l.right &&
            p.right > l.left &&
            p.top < l.bottom &&
            p.bottom > l.top
        ){
            collectLetter(letter);
        }
    });
}

function update(){

    if(keys["ArrowLeft"]){
        x -= speed;
        lastDirection = "left";
    }

    if(keys["ArrowRight"]){
        x += speed;
        lastDirection = "right";
    }

    if(keys["ArrowUp"]){
        y -= speed;
        lastDirection = "back";
    }

    if(keys["ArrowDown"]){
        y += speed;
        lastDirection = "front";
    }

    x = Math.max(0, Math.min(x, 1130));
    y = Math.max(0, Math.min(y, 850));

    player.style.left = x + "px";
    player.style.top = y + "px";

    if(!isPicking){
        player.src = spriteMap[lastDirection];
    }

    checkLetters();

    requestAnimationFrame(update);
}
