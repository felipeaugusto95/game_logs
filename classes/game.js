const Game = function(total_kills, players, kills){
    return {
        total_kills: total_kills,
        players:  players,
        kills: kills
    };
};

module.exports = Game;