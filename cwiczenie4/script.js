let canvas = document.getElementById('c')
let ctx = canvas.getContext('2d')

let ball = {
    x: 100,
    y: 100,
    vx: 100,
    vy: 100,
    r: 20,
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

    if(ball.x + ball.r >= 800 || ball.x - ball.r <= 0) ball.vx = - ball.vx
    if(ball.y + ball.r >= 600 || ball.y - ball.r <= 0) ball.vy = - ball.vy

    drawBall()


    prev = timestamp
    requestAnimationFrame(frame)
}

requestAnimationFrame(init)