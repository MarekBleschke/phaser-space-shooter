window.PIXI = require('phaser/build/custom/pixi');
window.p2 = require('phaser/build/custom/p2');
window.Phaser = require('phaser/build/custom/phaser-split');

var game = new Phaser.Game(800, 600, Phaser.CANVAS, '');

var LoadState = require('./game_states/load');
var PlayState = require('./game_states/play');
var ScoreboardState = require('./game_states/scoreboard');
var StartScreenState = require('./game_states/start_screen');

game.state.add('startScreen', StartScreenState);
game.state.add('play', PlayState);
game.state.add('scoreboard', ScoreboardState);
game.state.add('load', LoadState, true);
