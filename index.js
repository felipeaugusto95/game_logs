const fs = require('fs');
const readline = require('readline');

const fileGames = 'games.log';

const initGame = 'InitGame:';
const positionNameGame = 2;

const discardWorld = '<world>';

const delimiterKill = 'Kill:';
const delimiterKilled = "killed";
const delimiterBy = "by";
const positionInitial = 5;

const readLine = readline.createInterface({
    input: fs.createReadStream(fileGames),
    output: process.stdout,
    terminal: false
});
