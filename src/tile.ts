enum TileType {
    Wall,
    Floor
};

class Tile {
    private type: TileType;
    private visual_type: number;

    constructor(type: TileType) {
        this.setType(type);
    }

    /**
     * Is this Tile of given type?
     * @param type          Tile to compare to.
     * @returns {boolean}   True if they are the same type.
     */
    isType(type: TileType): boolean {
        return type == this.type;
    }

    /**
     * Get Tile's TileType
     * @returns {TileType}
     */
    getType(): TileType {
        return this.type;
    }

    /**
     * Change Tile's TileType
     * @param type  New TileType
     */
    setType(type: TileType): void {
        this.type = type;
        this.visual_type = 0;

        if (this.type == TileType.Floor) {
            this.visual_type = Math.floor(Math.random() * 2);
        }
    }

    /**
     * Get visual version of the type, if there are several.
     * At the moment, this only means like using different texture for otherwise identical floor.
     */
    getVisualType(): number {
        return this.visual_type;
    }
}