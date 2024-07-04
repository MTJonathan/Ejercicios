const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const $sprite = document.getElementById('sprite');
const $bricks = document.getElementById('bricks');

canvas.width = 448;
canvas.height = 512;

/*Variables de nuestro juego*/
//Variables de la pelota
const ballRadius = 6;
let x = canvas.width/2;
let y = canvas.height-30;

//Velocidad de la pelota
let dx = 2;
let dy = -2;

//Variables de la paleta
const paddleHeight = 10;
const paddleWidth = 50;
let paddleX = (canvas.width-paddleWidth)/2;
let paddleY = canvas.height-paddleHeight - 10;

let rigthPressed = false;
let leftPressed = false;

//Variables de los bloques
const brickRowCount = 6;
const brickColumnCount = 13;
const brickWidth = 32;
const brickHeight = 16;
const brickPadding = 0;
const brickOffsetTop = 80;
const brickOffsetLeft = 16;
const bricks = [];
const BRICK_STATUS = {
    ACTIVE: 1,
    DESTROYED : 0
}

for(let c=0; c<brickColumnCount; c++){
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++){
        //Calculamos la pocision de los bloques
        const brickX = c*(brickWidth+brickPadding)+brickOffsetLeft;
        const brickY = r*(brickHeight+brickPadding)+brickOffsetTop;
        bricks[c][r] = {x: brickX, y: brickY, status: 1};
        //Asignar un color al bloque
        const ramdomColor = Math.floor(Math.random()*8)+1;
        bricks[c][r] = {x: brickX, y: brickY, status: BRICK_STATUS.ACTIVE, color: ramdomColor};
    }
}

//Variables del puntaje
let score = 0;
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        // Calculamos la posición de los bloques
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        const randomColor = Math.floor(Math.random() * 8) + 1;
        bricks[c][r] = { x: brickX, y: brickY, status: BRICK_STATUS.ACTIVE, color: randomColor };
    }
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
}
function ballMovement(){
    //Robotar las pelotas en los laterales
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius){
        dx = -dx;
    }
    //Rebotar la pelota en la parte superior
    if(y + dy < ballRadius){
        dy = -dy;
    }

    //La pelota toca la paleta
    if(x + dx > paddleX && x + dx < paddleX + paddleWidth && y + dy > paddleY && y + dy < paddleY + paddleHeight){
        dy = -dy;
    }
    //La pelota toca el piso
    else if(y + dy > canvas.height-ballRadius){
        resetGame();
    }
    x += dx;
    y += dy;
}
function cleanCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function initEvents(){
    document.addEventListener('keydown', KeyDownHandler);
    document.addEventListener('keyup', KeyUpHandler);
    document.addEventListener('mousemove', mouseMoveHandler);
    canvas.addEventListener('touchstart', touchStartHandler);
    canvas.addEventListener('touchmove', touchMoveHandler);
    function KeyDownHandler(event){
        const {key} = event;
        if(key === 'Right' || key === 'ArrowRight'){
            rigthPressed = true;
        }
        if(key === 'Left' || key === 'ArrowLeft'){
            leftPressed = true;
        }
    }
    function KeyUpHandler(event){
        const {key} = event;
        if(key === 'Right' || key === 'ArrowRight'){
            rigthPressed = false;
        }
        if(key === 'Left' || key === 'ArrowLeft'){
            leftPressed = false;
        }
    }
    function mouseMoveHandler(event) {
        const relativeX = event.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth / 2;
        }
    }
    function touchStartHandler(event) {
        const touch = event.touches[0];
        const relativeX = touch.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth / 2;
        }
    }
    
    function touchMoveHandler(event) {
        const touch = event.touches[0];
        const relativeX = touch.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth / 2;
        }
    }
}
function drawPaddle(){
    ctx.drawImage($sprite, 29, 174,paddleWidth, paddleHeight, paddleX, paddleY, paddleWidth, paddleHeight);
}
function drawBricks(){
    for(let c=0; c<brickColumnCount; c++){
        for(let r=0; r<brickRowCount; r++){
            const currentBrick = bricks[c][r];
            if(currentBrick.status === BRICK_STATUS.DESTROYED)continue;
            const clipX = currentBrick.color * 32;
            ctx.drawImage($bricks, clipX, 0, 32, 14, currentBrick.x, currentBrick.y, brickWidth, brickHeight);
        }
    }
}
function drawScore(){
    ctx.font = '16px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText(`Score: ${score}`, 8, 20);
}
function collisionDetection(){
    for(let c=0; c<brickColumnCount; c++){
        for(let r=0; r<brickRowCount; r++){
            const currentBrick = bricks[c][r];
            if(currentBrick.status === BRICK_STATUS.DESTROYED)continue;
            if(x > currentBrick.x && x < currentBrick.x + brickWidth && y > currentBrick.y && y < currentBrick.y + brickHeight){
                dy = -dy;
                currentBrick.status = BRICK_STATUS.DESTROYED;
                score++;
            }
        }
    }
}
function paddleMovement(){
    if(rigthPressed && paddleX < canvas.width-paddleWidth){
        paddleX += 5;
    }
    else if(leftPressed && paddleX > 0){
        paddleX -= 5;
    }
}
function initBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            const randomColor = Math.floor(Math.random() * 8) + 1;
            bricks[c][r] = { x: brickX, y: brickY, status: BRICK_STATUS.ACTIVE, color: randomColor };
        }
    }
}
function resetGame() {
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 2;
    dy = -2;
    paddleX = (canvas.width - paddleWidth) / 2;

    // Restablece los ladrillos
    initBricks();

    // Restablece el puntaje
    score = 0;
}
function draw (){
    cleanCanvas();
    //Aqui haras tus dibujos y checks de colisiones
    //Hay que dibujar los elementos
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();

    //Colisiones y movimientos
    collisionDetection();
    ballMovement();
    paddleMovement();
    window.requestAnimationFrame(draw);
}
initEvents();
initBricks()
draw();