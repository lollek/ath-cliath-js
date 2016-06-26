///<reference path="graphics.ts"/>

function main() {
}

function mainMenu() {
   IO.drawMainMenu(); 
}

function init() {
    IO.init(<HTMLCanvasElement>document.getElementById("stdscr"), function () {
        mainMenu();
    });
}