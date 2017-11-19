
const { ipcRenderer } = require('electron');
// ipcRenderer.on('onResize', (e) => setTimeout(onResize, 17))

window.onresize = (e) => setTimeout(onResize, 17)

let interval = undefined
let lastOnStepTime = undefined
let app = undefined
let surface

function onLoad( ) {
    surface = document.getElementById('surf').getContext('2d')
    onResize( )
    onStartInterval( )
}

function onStartInterval( ) {
    if (interval != undefined) {
        throw 'interval has already started'
    }
    interval = setInterval(onStep, 17)
    lastOnStepTime = Date.now( )
}

function onEndInterval( ) {
    if (interval == undefined) {
        throw 'interval has not started'
    }
    clearInterval(interval)
    interval = undefined
}

function onResize( ) {
    app = new Application(surface, new Point(window.innerWidth, window.innerHeight))
}

function onStep( ) {
    if (app == undefined) {
        return
    }
    let now = Date.now( )
    let deltaTime = (now - lastOnStepTime) / 1000
    app.onStep(deltaTime)
    app.onDraw( )
    lastOnStepTime = now
}
