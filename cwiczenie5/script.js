let canvas = document.getElementById('c')
let ctx = canvas.getContext('2d')

let ball = {
    x: 500,
    y: 500,
    vx: 200,
    vy: -200,
    r: 5,
}

let r = 20
let brickGapX = 15
let brickGapY = 15
let brickHeight = 30
let brickWidth = 80

let brickCountX = 8
let brickCountY = 3


let bricks = []


class Brick {
    constructor(top, right, bottom, left) {
        this.top = top
        this.right = right
        this.bottom = bottom
        this.left = left
        bricks.push(this)
    }

    remove(){
        const index = bricks.indexOf(this);
        if (index > -1) {
            bricks.splice(index, 1);
        }
    }

    draw(){
        ctx.fillRect(this.left, this.top, this.right - this.left,this.bottom - this.top)
    }

    check(ball){
        //tu wstaw kod
    }
}

//init bricks
for (let i = 0; i < brickCountX; i++) {
    for (let j = 0; j < brickCountY; j++) {
        new Brick(j*(brickHeight + brickGapY) + brickGapY,
            (i+1)*(brickWidth + brickGapX),
            (j+1)*(brickHeight + brickGapY),
            i*(brickWidth + brickGapX) + brickGapX,
        )
    }
}

function calculateCollisions() {
    bricks.forEach(it=>it.check(ball))
}

function drawBricks(){
    bricks.forEach(it=>it.draw())
}

function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.r, 0, 2*Math.PI)
    ctx.closePath()
    ctx.fill()
}


let prev
function init(timestamp) {
    prev = timestamp
    requestAnimationFrame(frame)
}

function frame(timestamp) {
    let dt = timestamp - prev
    ctx.clearRect(0, 0, 800, 600)

    ball.x += dt/1000 * ball.vx
    ball.y += dt/1000 * ball.vy

    calculateCollisions()

    if(ball.x + ball.r >= 800 || ball.x - ball.r <= 0) ball.vx = - ball.vx
    if(ball.y + ball.r >= 600 || ball.y - ball.r <= 0) ball.vy = - ball.vy

    drawBricks()
    drawBall()

    prev = timestamp
    requestAnimationFrame(frame)
}

requestAnimationFrame(init)