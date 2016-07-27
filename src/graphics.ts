///<reference path="tile.ts"/>

namespace IO {

    const canvas_width: number = 800;
    const canvas_height: number = 600;

    const leftbar_width: number = 200;
    const leftbar_height: number = canvas_height;

    const botbar_width: number = canvas_width;
    const botbar_height: number = 160;

    const font_size: number = 20;
    const font_name: string = 'monospace';
    const font: string = font_size + 'px ' + font_name;

    const tile_size: number = 5;

    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;

    /**
     * Initialize IO for usage.
     * @param canvas_   The HTMLCanvasElement to use as main screen.
     */
    export function init(canvas_: HTMLCanvasElement): void {
        canvas = canvas_;
        canvas.addEventListener('keypress', keypressHook, false);
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        canvas.focus();

        context = canvas.getContext('2d');
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas_width, canvas_height);
    }

    /**
     * Draw the game map to the screen
     * @param map       Map to draw from
     * @param width     Width of the map
     * @param height    Height of the map
     */
    export function drawMap(map: Array<Tile>, width: number, height: number): void {
        for(let x: number = 0; x < width; ++x) {
            for(let y: number = 0; y < height; ++y) {
                drawTile(map[y * width + x], x, y);
            }
        }
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
                context.fillRect(x * tile_size, y * tile_size, tile_size, tile_size);
                break;
            case TileType.Wall:
                break;
        }
    }

    function keypressHook(event: KeyboardEvent): void {
    }

}