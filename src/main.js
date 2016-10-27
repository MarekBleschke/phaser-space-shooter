window.PIXI = require('phaser/build/custom/pixi')
window.p2 = require('phaser/build/custom/p2')
window.Phaser = require('phaser/build/custom/phaser-split')

var Weapons = require('./weapons.js');
var Waves = require('./enemy.js');
var Player = require('./player.js');

var game = new Phaser.Game(800, 600, Phaser.CANVAS, '');

var score = 0;

var Game = function () {
    this.player = null;

    this.cursors = null;
    this.wave = null;

    this.scoreText = null;
    this.livesText = null;
};

Game.prototype = {

    preload: function () {
        game.load.image('player', 'assets/player.png');
        game.load.image('enemy', 'assets/enemy.png');
        game.load.image('enemy2', 'assets/enemy2.png');
        game.load.image('bullet-player', 'assets/bullet-player.png');
        game.load.image('bullet-enemy', 'assets/bullet-enemy.png');
    },

    create: function () {
        this.cursors = this.game.input.keyboard.addKeys({
            'left': Phaser.KeyCode.LEFT,
            'right': Phaser.KeyCode.RIGHT,
            'space': Phaser.KeyCode.SPACEBAR
        });

        this.player = new Player(
            this.game,
            this.cursors,
            new Weapons.Weapon(game, 200, 250, 'bullet-player')
        );

        this.wave = new Waves.Wave(game);

        this.scoreText = game.add.text(16, 16, 'Score: 0', {fontSize: '18px', fill: '#FFF'});
        this.livesText = game.add.text(500, 16, 'Lives: ' + this.player.lives, {fontSize: '18px', fill: '#FFF'});
    },

    update: function () {
        var that = this; // TODO: better solution for this

        this.game.physics.arcade.overlap(this.player.weapon, this.wave, function (bullet, enemy) {
            score += enemy.points;
            that.scoreText.text = 'Score: ' + score;
            bullet.kill();
            enemy.destroy();

            if (that.wave.countLiving() === 0) {
                that.wave.destroy();
                that.wave = new Waves.Wave2(game);
            }
        });

        this.game.physics.arcade.overlap(this.player, this.wave.enemiesWeapons, function (player, enemyBullet) {
            enemyBullet.kill();
            player.handleHit();
            that.livesText.text = 'Lives: ' + that.player.lives;
        });
    }
};

game.state.add('Game', Game, true);
