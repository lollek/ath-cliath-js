///<reference path="tile.ts"/>

namespace Dungeon {

    /**
     * Remove everything in the current dungeon level and create a new one.
     */
    export function newLevel(): void {
        ++level;

        map = new Array<Tile>();
        for (let i: number = 0; i < dungeon_width; ++i) {
            for (let j: number = 0; j < dungeon_height; ++j) {
                map.push(new Tile(TileType.Wall));
            }
        }
        tryCreateRooms(dungeon_rooms_max);
    }

    class Coordinate {
        x: number;
        y: number;
        width: number;
        height: number;

        constructor(x: number, y: number, width: number, height: number) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
    }

    const dungeon_width: number = 100;
    const dungeon_height: number = 100;
    const dungeon_rooms_max: number = 50;
    const dungeon_room_min_size: number = 6;
    const dungeon_room_max_size: number = 10;

    let level: number = 0;
    let map: Array<Tile>;

    /**
     * Make several attempts to add rooms to the current map. Any number of rooms [0-max] may end up begin added.
     * @param max       The number of rooms to potentially add.
     */
    function tryCreateRooms(max: number): void {
        let previous_room: Coordinate = null;
        for (let i: number = 0; i < max; ++i) {
            let potential_previous_room: Coordinate = tryCreateRoom(previous_room);
            if (potential_previous_room != null) {
                previous_room = potential_previous_room
            }
        }
    }

    /**
     * Try to add a room to the dungeon map. This may or may not actually add a room.
     * @previous_room   The [x, y, width, height] of the previous room, or null.
     * @returns         The coordinate of the created room [x, y, width, height], or null.
     */
    function tryCreateRoom(previous_room: Coordinate): Coordinate {
        const additional: number = dungeon_room_max_size - dungeon_room_min_size;
        const room: Coordinate =
            new Coordinate(Math.floor(Math.random() * dungeon_width),
                           Math.floor(Math.random() * dungeon_height),
                           Math.floor(Math.random() * additional) + dungeon_room_min_size,
                           Math.floor(Math.random() * additional) + dungeon_room_min_size);

        // Run a checker first, to see if we overlap any room, or write out of bounds
        for (let x: number = 0; x < room.width; ++x) {
            for (let y: number = 0; y < room.height; ++y) {
                const this_x: number = room.x + x;
                const this_y: number = room.y + y;

                if (this_x >= dungeon_width || this_y >= dungeon_height ||
                    map[(room.y + y) * dungeon_width + room.x + x].type != TileType.Wall) {
                    return null;
                }
            }
        }

        // Make it floor
        for (let x: number = 0; x < room.width; ++x) {
            for (let y: number = 0; y < room.height; ++y) {
                map[(room.y + y) * dungeon_width + room.x + x].type = TileType.Floor;
            }
        }

        // Connect it to previous room
        if (previous_room != null) {
            if (Math.floor(Math.random() * 2) == 1) {
                createTunnelHorizontal(room, previous_room);
            } else {
                createTunnelVertical(room, previous_room);
            }
        }
        return room;
    }

    /**
     * Create a horizontal tunnel from one coordinate in the direction of another
     * @param from  Location to start from.
     * @param to    Location to dig towards.
     */
    function createTunnelHorizontal(from: Coordinate, to: Coordinate): void {
        const from_y: number = Math.floor(Math.random() * from.height) + from.y;
        let from_x: number = Math.floor(Math.random() * from.width) + from.x;
        let to_x: number = Math.floor(Math.random() * to.width) + to.x;

        if (from_x > to_x) {
            let tmp_x: number = from_x;
            from_x = to_x;
            to_x = tmp_x;
        }

        for (let x: number = from_x; x < to_x; ++x) {
            map[from_y * dungeon_width + x].type = TileType.Floor;
        }
    }

    /**
     * Create a vertical tunnel from one coordinate in the direction of another
     * @param from  Location to start from.
     * @param to    Location to dig towards.
     */
    function createTunnelVertical(from: Coordinate, to: Coordinate): void {
        const from_x: number = Math.floor(Math.random() * from.width) + from.x;
        let from_y: number = Math.floor(Math.random() * from.height) + from.y;
        let to_y: number = Math.floor(Math.random() * to.height) + to.y;

        if (from_y > to_y) {
            let tmp_y: number = from_y;
            from_y = to_y;
            to_y = tmp_y;
        }

        for (let y: number = from_y; y < to_y; ++y) {
            map[y * dungeon_width + from_x].type = TileType.Floor;
        }
    }
}