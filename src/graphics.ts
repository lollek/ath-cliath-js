///<reference path="dungeon.ts"/>
///<reference path="player.ts"/>
///<reference path="tile.ts"/>

namespace IO {

    const tile_size: number = 20;

    const canvas_width_px: number = 800;
    const canvas_width: number = canvas_width_px / tile_size;

    const canvas_height_px: number = 600;
    const canvas_height: number = canvas_height_px / tile_size;

    const leftbar_width_px: number = 200;
    const leftbar_height_px: number = canvas_height_px;

    const botbar_width_px: number = canvas_width_px;
    const botbar_height_px: number = 160;

    const font_size: number = 20;
    const font_name: string = 'monospace';
    const font: string = font_size + 'px ' + font_name;


    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;

    let camera_x: number;
    let camera_y: number;

    /**
     * Initialize IO for usage.
     * @param canvas_   The HTMLCanvasElement to use as main screen.
     */
    export function init(canvas_: HTMLCanvasElement): void {
        canvas = canvas_;
        canvas.addEventListener('keypress', keypressHook, false);
        canvas.width = canvas_width_px;
        canvas.height = canvas_height_px;
        canvas.focus();

        context = canvas.getContext('2d');
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas_width_px, canvas_height_px);
    }

    /**
     * Draw the map, player, monster, items, etc, to the screen
     */
    export function drawEverything(): void {
        setCameraAccordingToPlayer();
        drawMap();
        drawPlayer();
    }

    function setCameraAccordingToPlayer(): void {
        camera_x = Player.x - (canvas_width / 2);
        if (camera_x < 0) {
            camera_x = 0;
        } else if (camera_x >= Dungeon.width - canvas_width) {
            camera_x = Dungeon.width - canvas_width;
        }

        camera_y = Player.y - (canvas_height / 2);
        if (camera_y < 0) {
            camera_y = 0;
        } else if (camera_y >= Dungeon.height - canvas_height) {
            camera_y = Dungeon.height - canvas_height;
        }
    }

    /**
     * Draw the dungeon map to the screen
     */
    function drawMap(): void {
        for(let x: number = camera_x; x < camera_x + canvas_width; ++x) {
            for(let y: number = camera_y; y < camera_y + canvas_height; ++y) {
                drawTile(Dungeon.map[y * Dungeon.width + x], x, y);
            }
        }
    }

    /**
     * Draw the player to the screen
     */
    function drawPlayer(): void {
        context.fillStyle = 'red';
        context.font = font;
        drawCharAsTile('@', Player.x, Player.y);
    }

    /**
     * Draw a character, such as the player's '@' as a Tile. Meaning that it gets centered nicely,
     * and doesn't look weird. This is basically to contain all tweaking into one place.
     * You are expected to set styles and fonts and stuff before calling this function.
     * @char        Char to print
     * @x           x coordinate of the thing to print
     * @y           y coordinate of the thing to print
     */
    function drawCharAsTile(char: string, x: number, y: number): void {
        context.fillText(char, (x - camera_x) * tile_size + 4, (y - camera_y + 1) * tile_size - 3);
    }

    /**
     * Draw a game tile to the screen
     * @param tile  The tile to draw
     * @param x     x coordinate of given tile
     * @param y     y coordinate of given tile
     */
    function drawTile(tile: Tile, x: number, y: number): void {
        switch(tile.type) {
            case TileType.Floor:
                context.fillStyle = 'white';
                break;
            case TileType.Wall:
                context.fillStyle = 'black';
                break;
        }
        context.fillRect((x - camera_x) * tile_size, (y - camera_y) * tile_size, tile_size, tile_size);
    }

    function keypressHook(event: KeyboardEvent): void {
        switch (event.keyCode) {
            case  98: // b
                Player.move(-1, 1);
                break;
            case 104: // h
                Player.move(-1, 0);
                break;
            case 106: // j
                Player.move(0, 1);
                break;
            case 107: // k
                Player.move(0, -1);
                break;
            case 108: // l
                Player.move(1, 0);
                break;
            case 110: // n
                Player.move(1, 1);
                break;
            case 117: // u
                Player.move(1, -1);
                break;
            case 121: // y
                Player.move(-1, -1);
                break;
            default:
                console.log(event.keyCode);
                return;
        }
        drawEverything();
    }
}