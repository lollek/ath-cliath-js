var IO;
(function (IO) {
    var canvas;
    var context;
    var canvas_width = 800;
    var canvas_height = 600;
    var leftbar_width = 200;
    var leftbar_height = canvas_height;
    var botbar_width = canvas_width;
    var botbar_height = 160;
    var font_name = 'monospace';
    var img_menu_background = null;
    function keypressHook(event) {
    }
    function drawMainMenu() {
        context.drawImage(img_menu_background, 0, 0, img_menu_background.width, img_menu_background.height, 0, 0, canvas.width, canvas.height);
        // Title
        context.font = '20px ' + font_name;
        context.textAlign = 'center';
        context.fillText('Ath Cliath', canvas_width / 2, 100);
    }
    IO.drawMainMenu = drawMainMenu;
    function init(canvas_, fn) {
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
    IO.init = init;
})(IO || (IO = {}));
//# sourceMappingURL=graphics.js.map