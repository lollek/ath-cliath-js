enum TileType {
    Wall,
    Floor
};

class Tile {
    type: TileType;

    constructor(type: TileType) {
        this.type = type;
    }
}