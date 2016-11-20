let SimpleWave = require('../game_objects/waves/static_wave');
let Enemy = require('../game_objects/enemy');
let Weapons = require('../game_objects/weapons');

class Wave extends SimpleWave {
    constructor (game) {
        let weapon = new Weapons.Weapon(game, -200, 250, 'bullet-enemy');
        super({
            game: game,
            name: 'Wave 1',
            rows: 6,
            cols: 8,
            enemyFactory: (...args) => new Enemy(...args, 'enemy', 10),
            weapon: weapon
        });
    }
}

module.exports = Wave;