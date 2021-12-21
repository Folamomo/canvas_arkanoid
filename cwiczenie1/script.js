let canvas = document.getElementById('c')
let ctx = canvas.getContext('2d')

let r = 20

ctx.arc(100, 100, 50, 0, 2*Math.PI)
ctx.fill()
