// Game configuration constants
const CONFIG = {
    SPEED: 2,
    INITIAL_X: 600,
    INITIAL_Y: 500,
    BOUNDARY_PADDING: 50
};

// Sprite map for cleaner direction handling
const spriteMap = {
    "left": "character_s_left.png",
    "right": "character_s_right.png",
    "back": "character_s_back.png",
    "front": "character_s_front.png"
};

// DOM elements
const menu = document.getElementById("menu");
const game = document.getElementById("game");
const startBtn = document.getElementById("startBtn");
const player = document.getElementById("player");

// Game state
const GameState = {
    x: CONFIG.INITIAL_X,
    y: CONFIG.INITIAL_Y,
    keys: {},
    lastDirection: "front",
    isRunning: false,

    init() {
        this.setupEventListeners();
    },

    setupEventListeners() {
        startBtn.addEventListener("click", () => this.start());
        document.addEventListener("keydown", (e) => this.handleKeyDown(e));
        document.addEventListener("keyup", (e) => this.handleKeyUp(e));
    },

    start() {
        menu.style.display = "none";
        game.style.display = "block";
        this.isRunning = true;
        this.update();
    },

    handleKeyDown(e) {
        this.keys[e.key] = true;
    },

    handleKeyUp(e) {
        this.keys[e.key] = false;
    },

    handleInput() {
        if (this.keys["ArrowLeft"]) {
            this.x -= CONFIG.SPEED;
            this.lastDirection = "left";
        }

        if (this.keys["ArrowRight"]) {
            this.x += CONFIG.SPEED;
            this.lastDirection = "right";
        }

        if (this.keys["ArrowUp"]) {
            this.y -= CONFIG.SPEED;
            this.lastDirection = "back";
        }

        if (this.keys["ArrowDown"]) {
            this.y += CONFIG.SPEED;
            this.lastDirection = "front";
        }
    },

    updatePosition() {
        // Apply boundary checking to keep player on screen
        const gameArea = game.getBoundingClientRect();
        const maxX = gameArea.width - CONFIG.BOUNDARY_PADDING;
        const maxY = gameArea.height - CONFIG.BOUNDARY_PADDING;

        this.x = Math.max(0, Math.min(this.x, maxX));
        this.y = Math.max(0, Math.min(this.y, maxY));
    },

    updateSprite() {
        player.src = spriteMap[this.lastDirection];
        player.style.left = this.x + "px";
        player.style.top = this.y + "px";
    },

    update() {
        if (!this.isRunning) return;

        this.handleInput();
        this.updatePosition();
        this.updateSprite();

        requestAnimationFrame(() => this.update());
    }
};

// Initialize the game
GameState.init();
