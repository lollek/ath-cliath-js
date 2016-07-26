namespace IO {

    /**
     * Initialize IO for usage.
     * @param canvas_   The HTMLCanvasElement to use as main screen.
     */
    export function init(canvas_: HTMLCanvasElement): void {
        canvas = canvas_;
        context = canvas.getContext('2d');

        canvas.addEventListener('keypress', keypressHook, false);
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        canvas.focus();

        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas_width, canvas_height);
    }
    
    const canvas_width: number = 800;
    const canvas_height: number = 600;

    const leftbar_width: number = 200;
    const leftbar_height: number = canvas_height;

    const botbar_width: number = canvas_width;
    const botbar_height: number = 160;

    const font_size: number = 20;
    const font_name: string = 'monospace';
    const font: string = font_size + 'px ' + font_name;

    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;

    function keypressHook(event: KeyboardEvent): void {
    }

}