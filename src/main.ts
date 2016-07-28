///<reference path="dungeon.ts"/>
///<reference path="graphics.ts"/>
///<reference path="player.ts"/>

function main(): void {
}

function newGame(): void {
    Dungeon.newLevel();
    Player.init();
    IO.drawEverything();
}

function playGame(): void {
}

function init(): void {
    IO.init(<HTMLCanvasElement>document.getElementById('stdscr'));
    newGame();
    playGame();
}