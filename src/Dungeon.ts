///<reference path="tile.ts"/>

namespace Dungeon {
    const dungeon_width: number = 100;
    const dungeon_height: number = 100;

    let level: number = 0;
    let map: Array<Tile>;

    export function newLevel() {
        ++level;
        map = new Array<Tile>(dungeon_width * dungeon_height);
        console.log(map);
    }
}