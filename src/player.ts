///<reference path="dungeon.ts"/>

namespace Player {
    export let x: number = -1;
    export let y: number = -1;

    /**
     * Initialize the player, making it ready for playing the game
     */
    export function init(): void {
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

        x = target_x;
        y = target_y;
        return true;
    }
}