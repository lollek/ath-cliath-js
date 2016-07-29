///<reference path="coordinate.ts"/>
///<reference path="dungeon.ts"/>
///<reference path="player.ts"/>
///<reference path="tile.ts"/>

namespace IO {

    const tile_size: number = 20;

    const canvas_width_px: number = 800;
    const canvas_height_px: number = 600;

    const leftbar_x_px: number = 0;
    const leftbar_y_px: number = 0;
    const leftbar_width_px: number = 200;
    const leftbar_height_px: number = canvas_height_px;

    const map_x_px: number = leftbar_x_px + leftbar_width_px;
    const map_y_px: number = 0;
    const map_width_px: number = 600;
    const map_width: number = map_width_px / tile_size;
    const map_height_px: number = 600;
    const map_height: number = map_height_px / tile_size;

    const botbar_x_px: number = 0;
    const botbar_y_px: number = 0;
    const botbar_width_px: number = canvas_width_px;
    const botbar_height_px: number = 160;

    const font_size: number = 20;
    const font: string = font_size + 'px monospace';

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
        clearScreen();
        setCameraAccordingToPlayer();
        drawLeftbar();
        drawMap();
        drawPlayer();
    }

    /**
     * Blank out all data on the screen
     */
    function clearScreen(): void {
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas_width_px, canvas_height_px);
    }

    /**
     * Set camera variables so they are correct relative to player position
     */
    function setCameraAccordingToPlayer(): void {
        camera_x = Player.x - (map_width / 2);
        if (camera_x < 0) {
            camera_x = 0;
        } else if (camera_x >= Dungeon.width - map_width) {
            camera_x = Dungeon.width - map_width;
        }

        camera_y = Player.y - (map_height / 2);
        if (camera_y < 1) {
            camera_y = 0;
        } else if (camera_y >= Dungeon.height - map_height) {
            camera_y = Dungeon.height - map_height;
        }
    }

    /**
     * Draw the bar on the left side of the screen
     */
    function drawLeftbar(): void {
        context.fillStyle = 'white';
        context.font = '15px monospace';
        context.fillText(' Human', leftbar_x_px, leftbar_y_px + font_size);
        context.fillText(' Adventurer', leftbar_x_px, leftbar_y_px + font_size * 2);

        context.fillText(' AttrA : ', leftbar_x_px, leftbar_y_px + font_size * 4);
        context.fillText(' AttrB : ', leftbar_x_px, leftbar_y_px + font_size * 5);
        context.fillText(' AttrC : ', leftbar_x_px, leftbar_y_px + font_size * 6);
        context.fillText(' AttrD : ', leftbar_x_px, leftbar_y_px + font_size * 7);
        context.fillText(' AttrE : ', leftbar_x_px, leftbar_y_px + font_size * 8);
        context.fillText(' AttrF : ', leftbar_x_px, leftbar_y_px + font_size * 9);

        context.fillText(' Depth : ' + Dungeon.level * 50 + 'ft.', leftbar_x_px, leftbar_y_px + font_size * 25);
    }

    /**
     * Draw the dungeon map to the screen
     */
    function drawMap(): void {
        for (let tile of getTilesInFOV()) {
            if (tile.x == Dungeon.stairs.x && tile.y == Dungeon.stairs.y) {
                drawStairsDown(tile.x, tile.y);
            } else {
                drawTile(Dungeon.map[(tile.y * Dungeon.width) + tile.x], tile.x, tile.y);
            }
        }
    }

    /**
     * Draw stairs going down.
     * @param x     x coordinate of the stairs.
     * @param y     y coordinate of the stairs.
     */
    function drawStairsDown(x: number, y: number): void {
        drawCharAsTile('>', x, y, 'peru');
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
        const coord : Coordinate = new Coordinate(map_x_px + ((x - camera_x + 1) * tile_size),
                                                  map_y_px + ((y - camera_y + 1) * tile_size));
        /*
         * Write the background.
         */
        context.fillStyle = 'black';
        context.fillRect(coord.x, coord.y, tile_size, tile_size);

        /*
         * Write the char.
         */
        const text_align_x: number =  3;
        const text_align_y: number = 17;
        context.fillStyle = fill_style;
        context.font = font;
        context.fillText(char, coord.x + text_align_x, coord.y + text_align_y);
    }

    /**
     * Draw a game tile to the screen
     * @param tile  The tile to draw
     * @param x     x coordinate of given tile
     * @param y     y coordinate of given tile
     */
    function drawTile(tile: Tile, x: number, y: number): void {
        switch(tile.getType()) {
            case TileType.Floor:
                switch (tile.getVisualType()) {
                    case 0: drawCharAsTile(',', x, y, 'peru'); break;
                    case 1: drawCharAsTile('.', x, y, 'peru'); break;
                    default: throw 'UnknownVisualStyle';
                } break;

            case TileType.Wall:
                drawCharAsTile('#', x, y, 'grey');
                break;
        }
    }

    /**
     * Handle keyboard input events
     * @param event     Keyboard input received
     */
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
    function getTilesInPlayerViewDirection(): Array<Coordinate> {
        let return_data: Array<Coordinate> = [];

        const left: Coordinate = new Coordinate(-1, 0);
        const right: Coordinate = new Coordinate(1, 0);
        const up: Coordinate = new Coordinate(0, -1);
        const down: Coordinate = new Coordinate(0, 1);
        const left_up: Coordinate = new Coordinate(-1, -1);
        const left_down: Coordinate = new Coordinate(-1, 1);
        const right_up: Coordinate = new Coordinate(1, -1);
        const right_down: Coordinate = new Coordinate(1, 1);

        if (Player.looking_direction.equals(left)) {
            for (let x: number = camera_x; x < Player.x + 1; ++x) {
                for (let y: number = camera_y; y < camera_y + map_height; ++y) {
                    return_data.push(new Coordinate(x, y));
                }
            }

        } else if (Player.looking_direction.equals(right)) {
            for (let x: number = Player.x; x < camera_x + map_width; ++x) {
                for (let y: number = camera_y; y < camera_y + map_height; ++y) {
                    return_data.push(new Coordinate(x, y));
                }
            }
            
        } else if (Player.looking_direction.equals(up)) {
            for (let x: number = camera_x; x < camera_x + map_width; ++x) {
                for (let y: number = camera_y; y < Player.y + 1; ++y) {
                    return_data.push(new Coordinate(x, y));
                }
            }

        } else if (Player.looking_direction.equals(down)) {
            for (let x: number = camera_x; x < camera_x + map_width; ++x) {
                for (let y: number = Player.y; y < camera_y + map_height; ++y) {
                    return_data.push(new Coordinate(x, y));
                }
            }

        } else if (Player.looking_direction.equals(left_up)) {
            for (let x: number = camera_x; x < camera_x + map_width; ++x) {
                for (let y: number = camera_y; y < camera_y + map_height; ++y) {
                    if (Player.x + Player.y < x + y) {
                        break;
                    }
                    return_data.push(new Coordinate(x, y));
                }
            }

        } else if (Player.looking_direction.equals(right_up)) {
            for (let x: number = camera_x; x < camera_x + map_width; ++x) {
                for (let y: number = camera_y; y < camera_y + map_height; ++y) {
                    if (Player.y - Player.x < y - x) {
                        break;
                    }
                    return_data.push(new Coordinate(x, y));
                }
            }

        } else if (Player.looking_direction.equals(right_down)) {
            for (let x: number = camera_x + map_width; x >= camera_x; --x) {
                for (let y: number = camera_y + map_height; y >= camera_y; --y) {
                    if (Player.x + Player.y > x + y) {
                        break;
                    }
                    return_data.push(new Coordinate(x, y));
                }
            }

        } else if (Player.looking_direction.equals(left_down)) {
            for (let x: number = camera_x + map_width; x >= camera_x; --x) {
                for (let y: number = camera_y + map_height; y >= camera_y; --y) {
                    if (Player.y - Player.x > y - x) {
                        break;
                    }
                    return_data.push(new Coordinate(x, y));
                }
            }
        }

        return return_data;
    }

    /**
     * Calculate Field-Of-View relative to the player, and return the tile we are expected to draw to the screen.
     * @returns     Array of tuples [x, y] where x and y are map coordinates.
     */
    function getTilesInFOV(): Array<Coordinate> {
        const tiles_to_investigate: Array<Coordinate> = getTilesInPlayerViewDirection();
        let return_data: Array<Coordinate> = [];
        let return_data_info = [];

        for (let tile of tiles_to_investigate) {
            const distance: number = Math.sqrt((tile.x - Player.x) ** 2 + (tile.y - Player.y) ** 2);
            const distance_int: number = Math.floor(distance);
            const tile_dx: number = (tile.x - Player.x) / distance;
            const tile_dy: number = (tile.y - Player.y) / distance;

            for (let d: number = 0; d < distance_int; ++d) {
                let tmp: Coordinate = new Coordinate(Player.x + (tile_dx * d), Player.y + (tile_dy * d));
                tmp.x = tmp.x > Player.x ? Math.floor(tmp.x) : Math.ceil(tmp.x);
                tmp.y = tmp.y > Player.y ? Math.floor(tmp.y) : Math.ceil(tmp.y);

                const index: string = tmp.x + ' ' + tmp.y;
                if (return_data_info[index] == undefined) {
                    return_data_info[index] = true;
                    return_data.push(tmp);
                }

                if (!Dungeon.map[(tmp.y * Dungeon.width) + tmp.x].isType(TileType.Floor)) {
                    break;
                }
            }
        }
        return return_data;
    }
}