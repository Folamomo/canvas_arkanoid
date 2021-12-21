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
let score = 0

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

    collide(){
        this.remove()
        score += 1
    }

    check(ball){
        if ((this.top < ball.y + ball.r && this.bottom > ball.y - ball.r) &&
            (this.left < ball.x + ball.r && this.right > ball.x - ball.r)) {
            if (this.top < ball.y && this.bottom > ball.y) ball.vx = - ball.vx
            else if (this.left < ball.x && this.right > ball.x) ball.vy = - ball.vy
            else {
                ball.vx = - ball.vx
                ball.vy = - ball.vy
            }
            this.collide()
        }
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
function drawBricks(){
    bricks.forEach(it=>it.draw())
}

function calculateCollisions() {
    bricks.forEach(it=>it.check(ball))
}


class Platform extends Brick{
    constructor() {
        super(550, 450, 570, 350);
        this.leftKeyDown = false
        this.rightKeyDown = false

        document.addEventListener("keydown", (ev)=>{
            if(ev.code === 'ArrowLeft') this.leftKeyDown = true
            if(ev.code === 'ArrowRight') this.rightKeyDown = true
        })

        document.addEventListener("keyup", (ev)=>{
            if(ev.code === 'ArrowLeft') this.leftKeyDown = false
            if(ev.code === 'ArrowRight') this.rightKeyDown = false
        })
    }

    collide() {

    }

    move(){
        if (this.leftKeyDown) this.moveLeft()
        if (this.rightKeyDown) this.moveRight()
    }

    moveLeft(){
        if (this.left > 0) {
            this.left -= 10
            this.right -= 10
        }
    }

    moveRight(){
        if (this.right < 800) {
            this.left += 10
            this.right += 10
        }
    }

}

let platform = new Platform()

function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.r, 0, 2*Math.PI)
    ctx.closePath()
    ctx.fill()
}


function drawScores() {
    ctx.font = "16px Arial";
    ctx.fillText("Score: " + score, 8, 580);
}

function die() {
    ctx.clearRect(0, 0, 800, 600)
    ctx.font = "50px Arial";
    ctx.fillText("GAME OVER", 250, 250);
}

function win() {
    ctx.clearRect(0, 0, 800, 600)
    ctx.font = "50px Arial";
    ctx.fillText("CONGRATULATIONS!!!", 130, 250);
}

document.addEventListener("keypress", (ev)=>{
    if(ev.code === 'KeyF') canvas.requestFullscreen()
})

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

    platform.move()
    calculateCollisions()

    if(ball.x + ball.r >= 800 || ball.x - ball.r <= 0) ball.vx = - ball.vx
    if(ball.y - ball.r <= 0) ball.vy = - ball.vy

    if(ball.y + ball.r >= 600) return die()
    if(score === brickCountY * brickCountX) return win()


    drawBricks()
    drawBall()
    drawScores()

    prev = timestamp
    requestAnimationFrame(frame)
}

requestAnimationFrame(init)

