const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake = [{ x: 200, y: 200 }];
let direction = { x: 20, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;
let speed = 150;

function init() {
    score = 0;
    snake = [{ x: 200, y: 200 }];
    direction = { x: 20, y: 0 };
    placeFood();
    document.getElementById('score').innerText = score;
    clearInterval(gameLoop);
    gameLoop = setInterval(game, speed);
}

function placeFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 20)) * 20;
    food.y = Math.floor(Math.random() * (canvas.height / 20)) * 20;
}

function game() {
    updateSnake();
    checkCollision();
    draw();
}

function updateSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('score').innerText = score;
        placeFood();
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        endGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
        }
    }
}

function endGame() {
    clearInterval(gameLoop);
    alert('Игра окончена! Ваши очки: ' + score);
    init();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    for (const segment of snake) {
        ctx.fillRect(segment.x, segment.y, 20, 20);
    }
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 20, 20);
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -20 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 20 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -20, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 20, y: 0 };
            break;
    }
});

document.getElementById('startButton').addEventListener('click', init);

let gameLoop;
init();