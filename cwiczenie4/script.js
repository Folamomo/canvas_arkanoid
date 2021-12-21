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

    //Tutaj wstaw kod

    prev = timestamp
    requestAnimationFrame(frame)
}

requestAnimationFrame(init)