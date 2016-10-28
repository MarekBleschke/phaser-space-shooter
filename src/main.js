window.PIXI = require('phaser/build/custom/pixi');
window.p2 = require('phaser/build/custom/p2');
window.Phaser = require('phaser/build/custom/phaser-split');

var game = new Phaser.Game(800, 600, Phaser.CANVAS, '');

var loadState = require('./game_states/load');
var playState = require('./game_states/play');
var scoreboardState = require('./game_states/scoreboard');

game.state.add('play', playState);
game.state.add('scoreboard', scoreboardState);
game.state.add('load', loadState, true);
