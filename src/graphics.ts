namespace IO {
    var canvas;
    var context;

    const canvas_width = 800;
    const canvas_height = 600;

    const leftbar_width = 200;
    const leftbar_height = canvas_height;

    const botbar_width = canvas_width;
    const botbar_height = 160;
    
    const font_name = 'monospace';

    var img_menu_background = null;

    function keypressHook(event) {

    }

    export function drawMainMenu() {
        context.drawImage(img_menu_background,
            0, 0, img_menu_background.width, img_menu_background.height,
            0, 0, canvas.width, canvas.height);

        // Title
        context.font = '20px ' + font_name;
        context.textAlign = 'center';
        context.fillText('Ath Cliath', canvas_width / 2, 100);


    }
    
    export function init(canvas_: HTMLCanvasElement, fn : Function) {
        canvas = canvas_;
        context = canvas.getContext('2d');

        canvas.addEventListener('keypress', keypressHook, false);
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        canvas.focus();

        img_menu_background = new Image();
        img_menu_background.src = '/img/BG_IMG2.png';
        img_menu_background.onload = function () {
            fn();
        };
    }
}