let canvas = document.getElementById('c')
let ctx = canvas.getContext('2d')

let r = 20
let brickGapX = 10
let brickGapY = 10
let brickHeight = 30
let brickWidth = 80

let brickCountX = 5
let brickCountY = 3

function brick() {
    ctx.fillRect(0, 0, brickWidth, brickHeight)
    ctx.strokeRect(0, 0, brickWidth, brickHeight)
}

ctx.save()
for (let i = 0; i < brickCountY; i++) {
    ctx.save()
    for (let j = 0; j < brickCountX; j++) {
        brick()
        ctx.translate(brickWidth + brickGapX, 0)
    }
    ctx.restore()
    ctx.translate(0, brickHeight + brickGapY)
}
ctx.restore()
