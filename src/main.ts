///<reference path="graphics.ts"/>
///<reference path="dungeon.ts"/>

function main(): void {
}

function newGame(): void {
    Dungeon.newLevel();
}

function playGame(): void {
}

function init(): void {
    IO.init(<HTMLCanvasElement>document.getElementById('stdscr'));
    newGame();
    playGame();
}