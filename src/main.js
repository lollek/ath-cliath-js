///<reference path="graphics.ts"/>
function main() {
}
function mainMenu() {
    IO.drawMainMenu();
}
function init() {
    IO.init(document.getElementById("stdscr"), function () {
        mainMenu();
    });
}
//# sourceMappingURL=main.js.map