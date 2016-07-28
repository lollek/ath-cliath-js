///<reference path="dungeon.ts"/>

namespace Player {
    /// X coordinate of the player
    export let x: number = -1;
    /// Y coordinate of the player
    export let y: number = -1;
    /// In which direction [x, y] is the player looking?
    export let looking_direction: [number, number] = [0, 0];

    /**
     * Initialize the player, making it ready for playing the game
     */
    export function init(): void {
        looking_direction = [0, -1];
        for (;;) {
            x = Math.floor(Math.random() * Dungeon.width);
            y = Math.floor(Math.random() * Dungeon.height);

            if (Dungeon.map[y * Dungeon.width + x].type == TileType.Floor) {
                break;
            }
        }
    }

    /**
     * Make an attempt to move the player in the given direction.
     * @param dx    delta x to move [-1, 0, 1]
     * @param dy    delta y to move [-1, 0, 1]
     * @returns     true if player managed to move
     */
    export function move(dx: number, dy: number): boolean {
        const target_x: number = x + dx;
        const target_y: number = y + dy;
        if (target_x >= Dungeon.width || target_y >= Dungeon.height) {
            return false;
        }

        const target_tile: Tile = Dungeon.map[(target_y * Dungeon.width) + target_x];
        if (target_tile.type != TileType.Floor) {
            return false;
        }

        if (target_x != x || target_y != y) {
            looking_direction = [dx, dy];
        }

        x = target_x;
        y = target_y;
        return true;
    }

    /**
     * Look in a direction
     * @param dx    delta x to look towards
     * @param dy    delta y to look towards
     */
    export function look(dx: number, dy: number): void {
        looking_direction = [dx, dy];
    }
}