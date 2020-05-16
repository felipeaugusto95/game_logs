const fs = require('fs');
const readline = require('readline');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/gameResult')(app);

app.listen(port, () => {
    console.log(`Server is running at localhost:${port}`);
});

var Game = require('./classes/game');
var User = require('./classes/user');

const fileGames = './logs/games.log';
const fileCollection = './collections/collection.json';

const initGame = 'InitGame:';
const delimiterShutdownGame = 'ShutdownGame:';
const discardWorld = '<world>';
const delimiterKill = 'Kill:';
const delimiterKilled = "killed";
const delimiterBy = "by";
const positionInitial = 5;

function unexpectedShutDown(arrayLine){
    return (arrayLine.length == 4 && arrayLine.includes('26'));
}

function parsingLog(){

    var allGames = [];
    var players = [];
    var usersKills = [];
    var totalKills = 0;

    const readLine = readline.createInterface({
        input: fs.createReadStream(fileGames),
        output: process.stdout,
        terminal: false
    });

    readLine.on('line', (line) => {
        let removeWhiteSpaces = line.trim();
        let splitLine = removeWhiteSpaces.split(" ");

        if(splitLine.includes(initGame)){
            totalKills = 0;
            players = [];
            usersKills = [];
        }

        //Segunda condição do if é devido a um log de um game que não foi finalizado com ShutdownGame
        if(splitLine.includes(delimiterShutdownGame) || unexpectedShutDown(splitLine)){
            var objUserNumKills = {};

            usersKills.forEach((obj) => {
                objUserNumKills[obj.name] = obj.num_kills;
            });

            let infoGame = new Game(totalKills, players, objUserNumKills);;
            allGames.push(infoGame);
        }
        
        if(splitLine.includes(delimiterKill) && splitLine.includes(delimiterKilled)){
            totalKills++;
            let killer = splitLine[positionInitial];
            if(splitLine[positionInitial + 1] !== delimiterKilled){
                for (let i = positionInitial + 1; i < splitLine.indexOf(delimiterKilled); i++)
                    killer += ' ' + splitLine[i];
            }

            if(!players.includes(killer) && killer !== discardWorld)
                players.push(killer);

            var existsKiller = usersKills.find((userKiller) => userKiller.name == killer);
            if(!existsKiller){
                if(killer !== discardWorld)
                    usersKills.push(new User(killer, 1));
            } else
                existsKiller.num_kills += 1;
            

            let indexKilled = splitLine.indexOf(delimiterKilled) + 1;
            let killed = splitLine[indexKilled];
            if((indexKilled + 1) < splitLine.indexOf(delimiterBy)){
                for(let i = (indexKilled + 1); i < splitLine.indexOf(delimiterBy); i++)
                    killed += " " + splitLine[i];
            }
            if(!players.includes(killed))
                players.push(killed);

            var wasKilled = usersKills.find((userKiller) => userKiller.name == killed);
            if(killer === discardWorld){
                if(!wasKilled)
                    usersKills.push(new User(killed, -1));
                else
                    wasKilled.num_kills -= 1;
            } else{
                if(!wasKilled)
                    usersKills.push(new User(killed, 0));
            }
        }

    }).on('close', function() {
        convertToObj = Object.assign({}, allGames);
        fs.writeFile(
            fileCollection,
            JSON.stringify(convertToObj),
            function (err) {
                if (err) {
                    console.error(err);
                }
            }
        );
    });
}

if (!fs.existsSync(fileCollection)) {
    parsingLog();
}