const menu = document.getElementById("menu");
const game = document.getElementById("game");
const startBtn = document.getElementById("startBtn");
const player = document.getElementById("player");

const messageBox = document.getElementById("messageBox");
const messageTitle = document.getElementById("messageTitle");
const messageText = document.getElementById("messageText");

let gameStarted = false;
let lettersCollected = 0;

let x = 100;
let y = 100;
const speed = 5;

const keys = {};
let lastDirection = "front";
let isPicking = false;

function showMessage(title, text){
    messageTitle.textContent = title;
    messageText.textContent = text;
    messageBox.style.display = "block";
}

function hideMessage(){
    messageBox.style.display = "none";
}

startBtn.addEventListener("click", () => {

    menu.style.display = "none";
    game.style.display = "block";

    showMessage(
        "Movement 💖",
        "Use WASD, ZQSD, or the Arrow Keys to move around!"
    );

});

document.addEventListener("keydown", (e) => {

    keys[e.key] = true;

    if(!gameStarted){

        gameStarted = true;

        showMessage(
            "Mission 1 💌",
            "Hello! Welcome! Start searching and picking the letters. There are 7 hidden letters!"
        );

        setTimeout(() => {

            hideMessage();

            requestAnimationFrame(update);

        }, 5000);
    }
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
    right: "character_pick.png",
    back: "character_pick_front.png",
    front: "character_pick_front.png"
};

function collectLetter(letter){

    if(isPicking) return;

    isPicking = true;

    player.src = pickSpriteMap[lastDirection];

    letter.style.display = "none";

    lettersCollected++;

    setTimeout(() => {

        letter.remove();

        isPicking = false;

        player.src = spriteMap[lastDirection];

        if(lettersCollected === 7){

            showMessage(
                "Congratulations! 🎉",
                "You've completed your first mission! 💖"
            );

        }

    }, 1500);
}

function checkLetters(){

    const p = player.getBoundingClientRect();

    document.querySelectorAll(".letter").forEach(letter => {

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

    if(!isPicking){

        if(keys["ArrowLeft"] || keys["a"] || keys["q"]){
            x -= speed;
            lastDirection = "left";
        }

        if(keys["ArrowRight"] || keys["d"]){
            x += speed;
            lastDirection = "right";
        }

        if(keys["ArrowUp"] || keys["w"] || keys["z"]){
            y -= speed;
            lastDirection = "back";
        }

        if(keys["ArrowDown"] || keys["s"]){
            y += speed;
            lastDirection = "front";
        }

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
