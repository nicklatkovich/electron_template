/// <reference path='./point.ts'/>

const DIRECTION_ACC: number = 6
class Instance extends Point {
    speed: number
    direction: number
    constructor(x: number, y: number, speed: number, direction: number) {
        super(x, y)
        this.speed = speed
        this.direction = direction
    }
    onStep(deltaTime: number) {
        this.direction += (Math.random( ) - 0.5) * 2.0 * DIRECTION_ACC * deltaTime
        this.moveInDirection(this.direction, this.speed * deltaTime)
    }
}
