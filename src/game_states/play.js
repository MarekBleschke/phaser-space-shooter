var Weapons = require('./../game_objects/weapons');
var Waves = require('./../game_objects/enemy');
var Player = require('./../game_objects/player');
var StatsBar = require('./../game_objects/stats_bar');
var pauseScreen = require('./../game_objects/pause_screen');

class PlayState {
    create (game) {
        this.cursors = game.input.keyboard.addKeys({
            'left': Phaser.KeyCode.LEFT,
            'right': Phaser.KeyCode.RIGHT,
            'space': Phaser.KeyCode.SPACEBAR,
            'p': Phaser.KeyCode.P
        });

        this.player = new Player(
            game,
            this.cursors,
            new Weapons.Weapon(game, 200, 250, 'bullet-player')
        );

        this.wave = new Waves.Wave(game);

        this.statsBar = new StatsBar(game, this.player.score, this.player.lives);

        pauseScreen(game, this.cursors.p);
    }

    update (game) {
        var that = this; // TODO: better solution for this

        game.physics.arcade.overlap(this.player.weapon, this.wave, function (bullet, enemy) {
            let score = that.player.updateScore(enemy.points);
            that.statsBar.updateScore(score);
            bullet.kill();
            enemy.destroy();

            if (that.wave.countLiving() === 0) {
                that.wave.destroy();
                that.wave = new Waves.Wave2(that.game);
            }
        });

        game.physics.arcade.overlap(this.player, this.wave.enemiesWeapons, function (player, enemyBullet) {
            enemyBullet.kill();
            player.handleHit();
            that.statsBar.updateLives(player.lives);
            if (!player.alive) {
                that.game.state.start('scoreboard');
            }
        });
    }
}

module.exports = PlayState;