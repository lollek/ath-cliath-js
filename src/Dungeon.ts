///<reference path="coordinate.ts"/>
///<reference path="room.ts"/>
///<reference path="tile.ts"/>

namespace Dungeon {
    export const width: number = 100;
    export const height: number = 100;
    export let map: Array<Tile>;
    export let level: number = 0;
    export let stairs: Coordinate;

    const dungeon_rooms_max: number = 50;
    const dungeon_room_min_size: number = 6;
    const dungeon_room_max_size: number = 10;

    /**
     * Remove everything in the current dungeon level and create a new one.
     */
    export function newLevel(): void {
        ++level;

        map = new Array<Tile>();
        for (let i: number = 0; i < width; ++i) {
            for (let j: number = 0; j < height; ++j) {
                map.push(new Tile(TileType.Wall));
            }
        }

        let last_room: Room = tryCreateRooms(dungeon_rooms_max);
        stairs = new Coordinate(Math.floor(Math.random() * last_room.width) + last_room.x,
                                Math.floor(Math.random() * last_room.height) + last_room.y);

    }

    /**
     * Make several attempts to add rooms to the current map. Any number of rooms [0-max] may end up begin added.
     * @param max       The number of rooms to potentially add.
     * @returns         The last of the created rooms.
     */
    function tryCreateRooms(max: number): Room {
        let previous_room: Room = null;
        for (let i: number = 0; i < max; ++i) {
            let potential_previous_room: Room = tryCreateRoom(previous_room);
            if (potential_previous_room != null) {
                previous_room = potential_previous_room
            }
        }
        return previous_room;
    }

    /**
     * Try to add a room to the dungeon map. This may or may not actually add a room.
     * @previous_room   The [x, y, width, height] of the previous room, or null.
     * @returns         The coordinate of the created room [x, y, width, height], or null.
     */
    function tryCreateRoom(previous_room: Room): Room {
        const padding: number = 2;
        const additional: number = dungeon_room_max_size - dungeon_room_min_size;
        const room: Room =
            new Room(Math.floor(Math.random() * (width - padding)) + padding,
                     Math.floor(Math.random() * (height - padding)) + padding,
                     Math.floor(Math.random() * additional) + dungeon_room_min_size,
                     Math.floor(Math.random() * additional) + dungeon_room_min_size);

        // Run a checker first, to see if we overlap any room, or write out of bounds
        for (let x: number = 0; x < room.width; ++x) {
            for (let y: number = 0; y < room.height; ++y) {
                const this_x: number = room.x + x;
                const this_y: number = room.y + y;

                if (this_x >= width || this_y >= height ||
                    map[(room.y + y) * width + room.x + x].type != TileType.Wall) {
                    return null;
                }
            }
        }

        // Make it floor
        for (let x: number = 0; x < room.width; ++x) {
            for (let y: number = 0; y < room.height; ++y) {
                map[(room.y + y) * width + room.x + x].type = TileType.Floor;
            }
        }

        // Connect it to previous room
        if (previous_room != null) {
            const from_x: number = Math.floor(Math.random() * room.width) + room.x;
            const from_y: number = Math.floor(Math.random() * room.height) + room.y;
            const to_x: number = Math.floor(Math.random() * previous_room.width) + previous_room.x;
            const to_y: number = Math.floor(Math.random() * previous_room.height) + previous_room.y;

            if (Math.floor(Math.random() * 2) == 1) {
                createTunnelHorizontal(from_x, to_x, from_y);
                createTunnelVertical(from_y, to_y, to_x);
            } else {
                createTunnelVertical(from_y, to_y, from_x);
                createTunnelHorizontal(from_x, to_x, to_y);
            }
        }
        return room;
    }

    /**
     * Create a horizontal tunnel from one coordinate to another
     * @param from_x    x coordinate to start digging from
     * @param to_x      x coordinate to stop digging (inclusive)
     * @param from_y    y coordinate to dig in
     */
    function createTunnelHorizontal(from_x: number, to_x: number, from_y: number): void {
        if (from_x > to_x) {
            let tmp_x: number = from_x;
            from_x = to_x;
            to_x = tmp_x;
        }

        for (let x: number = from_x; x <= to_x; ++x) {
            map[from_y * width + x].type = TileType.Floor;
        }
    }

    /**
     * Create a vertical tunnel from one coordinate in the direction of another
     * @param from_y    y coordinate to start digging from
     * @param to_y      y coordinate to stop digging at (inclusive)
     * @param from_x    x coordinate to dig in
     */
    function createTunnelVertical(from_y: number, to_y: number, from_x: number): void {
        if (from_y > to_y) {
            let tmp_y: number = from_y;
            from_y = to_y;
            to_y = tmp_y;
        }

        for (let y: number = from_y; y <= to_y; ++y) {
            map[y * width + from_x].type = TileType.Floor;
        }
    }
}