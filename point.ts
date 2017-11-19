
class Point {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
    moveInDirection(direction: number, distance: number): void {
        this.x += Math.cos(direction) * distance
        this.y += Math.sin(direction) * distance
    }
    getArea( ): number {
        return this.x * this.y
    }
    getDistanceToSqr(point: Point): number {
        return Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2)
    }
    getDistanceTo(point: Point): number {
        return Math.sqrt(this.getDistanceToSqr(point))
    }
}
