class Coordinate {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Is this Coordinate identical to another Coordinate?
     * @param o             Coordinate to compare to.
     * @returns {boolean}   True if identical.
     */
    equals(o: Coordinate): boolean {
        return this.x == o.x && this.y == o.y;
    }
}