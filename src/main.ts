///<reference path="graphics.ts"/>
///<reference path="dungeon.ts"/>

function main() {
}

function newGame() {
    Dungeon.newLevel();
}

function playGame() {
}

function init() {
    IO.init(<HTMLCanvasElement>document.getElementById('stdscr'));
    newGame();
    playGame();
}