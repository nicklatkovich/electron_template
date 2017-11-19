/// <reference path='./instance.ts'/>

const AVERAGE_AREA: number = 10000.0
const MAX_NET_LENGTH: number = 100.0
const MAX_NET_LENGTH_SQR: number = Math.pow(MAX_NET_LENGTH, 2)

class Application {
    instances: Instance[ ]
    size: Point
    surface: CanvasRenderingContext2D

    constructor(surface: CanvasRenderingContext2D, size: Point) {
        this.surface = surface
        this.size = size
        this.size.x += 2 * MAX_NET_LENGTH
        this.size.y += 2 * MAX_NET_LENGTH
        this.instances = [ ]
        let count: number = this.size.getArea( ) / AVERAGE_AREA
        for (let i = 0; i < count; i++) {
            this.instances.push(new Instance(
                Math.random( ) * this.size.x,
                Math.random( ) * this.size.y, 100, Math.random( ) * Math.PI * 2.0))
        }
        this.surface.canvas.width = this.size.x
        this.surface.canvas.height = this.size.y
        this.surface.canvas.style.left = -MAX_NET_LENGTH + 'px'
        this.surface.canvas.style.top = -MAX_NET_LENGTH + 'px'
    }

    onStep(deltaTime: number): void {
        this.instances.forEach(element => {
            element.onStep(deltaTime)
            if (element.x < 0) {
                element.x += this.size.x
            } else if (element.x > this.size.x) {
                element.x -= this.size.x
            }
            if (element.y < 0) {
                element.y += this.size.y
            } else if (element.y > this.size.y) {
                element.y -= this.size.y
            }
        });
    }

    onDraw( ): void {
        // this.surface.clearRect(0, 0, this.size.x, this.size.y)
        this.instances.forEach(element => {
            this.instances.forEach(other => {
                if (other == element) {
                    return
                }
                let distanceSqr = element.getDistanceToSqr(other)
                if (distanceSqr < MAX_NET_LENGTH_SQR) {
                    let distance = Math.sqrt(distanceSqr)
                    let alpha = 1.0 - distance / MAX_NET_LENGTH
                    this.surface.beginPath( )
                    this.surface.strokeStyle = Application.getRGBA(192, 32, 32, alpha)
                    this.surface.lineWidth = 3
                    this.surface.moveTo(element.x, element.y)
                    this.surface.lineTo(other.x, other.y)
                    this.surface.stroke( )
                }
            });
        });
    }

    static getRGBA(red: number, green: number, blue: number, alpha: number) {
        return 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')'
    }
}
