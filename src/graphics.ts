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
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas_width_px, canvas_height_px);
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
        for (let tile of getTilesInFOV()) {
            let x: number = tile[0];
            let y: number = tile[1];
            drawTile(Dungeon.map[y * Dungeon.width + x], x, y);
        }
    }

    /**
     * Draw the player to the screen
     */
    function drawPlayer(): void {
        drawCharAsTile('@', Player.x, Player.y, 'red');
    }

    /**
     * Draw a character, such as the player's '@' as a Tile. Meaning that it gets centered nicely,
     * and doesn't look weird. This is basically to contain all tweaking into one place.
     * You are expected to set styles and fonts and stuff before calling this function.
     * @char        Char to print
     * @x           x coordinate of the thing to print
     * @y           y coordinate of the thing to print
     * @fill_style  Fill style for the char to draw
     */
    function drawCharAsTile(char: string, x: number, y: number, fill_style: string='white'): void {
        context.fillStyle = 'black';
        context.fillRect((x - camera_x) * tile_size, (y - camera_y) * tile_size, tile_size, tile_size);
        context.fillStyle = fill_style;
        context.font = font;
        context.fillText(char, (x - camera_x) * tile_size, (y - camera_y + 1) * tile_size);
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
                drawCharAsTile('.', x, y);
                break;
            case TileType.Wall:
                drawCharAsTile('#', x, y);
                break;
        }
    }

    function keypressHook(event: KeyboardEvent): void {
        switch (event.keyCode) {
            
            // Look in a direction
            case  66: Player.look(-1,  1); break; // B
            case  72: Player.look(-1,  0); break; // H
            case  74: Player.look( 0,  1); break; // J
            case  75: Player.look( 0, -1); break; // K
            case  76: Player.look( 1,  0); break; // L
            case  78: Player.look( 1,  1); break; // N
            case  85: Player.look( 1, -1); break; // U
            case  89: Player.look(-1, -1); break; // Y

            // Move in a direction
            case  98: Player.move(-1,  1); break; // b
            case 104: Player.move(-1,  0); break; // h
            case 106: Player.move( 0,  1); break; // j
            case 107: Player.move( 0, -1); break; // k
            case 108: Player.move( 1,  0); break; // l
            case 110: Player.move( 1,  1); break; // n
            case 117: Player.move( 1, -1); break; // u
            case 121: Player.move(-1, -1); break; // y

            default:
                console.log(event.keyCode);
                return;
        }
        drawEverything();
    }

    /**
     * Return all tiles in the direction the player is looking
     */
    function getTilesInPlayerViewDirection(): Array<[number, number]> {
        let return_data: Array<[number, number]> = [];

        let start_x: number = 0;
        let stop_x: number = 0;
        let start_y: number = 0;
        let stop_y: number = 0;

        if (Player.looking_direction[0] > 0) {
            start_x = Player.x;
            stop_x = camera_x + canvas_width;
        } else if (Player.looking_direction[0] < 0) {
            start_x = camera_x;
            stop_x = Player.x;
        } else {
            start_x = camera_x;
            stop_x = camera_x + canvas_width;
        }

        if (Player.looking_direction[1] > 0) {
            start_y = Player.y;
            stop_y = camera_y + canvas_height;
        } else if (Player.looking_direction[1] < 0) {
            start_y = camera_y;
            stop_y = Player.y;
        } else {
            start_y = camera_y;
            stop_y = camera_y + canvas_height;
        }

        for (let x: number = start_x; x < stop_x; ++x) {
            for (let y: number = start_y; y < stop_y; ++y) {
                return_data.push([x, y]);
            }
        }

        return return_data;
    }

    /**
     * Calculate Field-Of-View relative to the player, and return the tile we are expected to draw to the screen.
     * @returns     Array of tuples [x, y] where x and y are map coordinates.
     */
    function getTilesInFOV(): Array<[number, number]> {
        let return_data: Array<[number, number]> = [];

        return getTilesInPlayerViewDirection();
    }
}