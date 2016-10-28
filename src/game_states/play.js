var Weapons = require('./../game_objects/weapons');
var Waves = require('./../game_objects/enemy');
var Player = require('./../game_objects/player');
var StatsBar = require('./../game_objects/stats_bar');

class playState {
    create () {
        this.cursors = this.game.input.keyboard.addKeys({
            'left': Phaser.KeyCode.LEFT,
            'right': Phaser.KeyCode.RIGHT,
            'space': Phaser.KeyCode.SPACEBAR
        });

        this.player = new Player(
            this.game,
            this.cursors,
            new Weapons.Weapon(this.game, 200, 250, 'bullet-player')
        );

        this.wave = new Waves.Wave(this.game);

        this.statsBar = new StatsBar(this.game, this.player.score, this.player.lives);
    }

    update () {
        var that = this; // TODO: better solution for this

        this.game.physics.arcade.overlap(this.player.weapon, this.wave, function (bullet, enemy) {
            let score = that.player.updateScore(enemy.points);
            that.statsBar.updateScore(score);
            bullet.kill();
            enemy.destroy();

            if (that.wave.countLiving() === 0) {
                that.wave.destroy();
                that.wave = new Waves.Wave2(that.game);
            }
        });

        this.game.physics.arcade.overlap(this.player, this.wave.enemiesWeapons, function (player, enemyBullet) {
            enemyBullet.kill();
            player.handleHit();
            that.statsBar.updateLives(that.player.lives);
            if (!player.alive) {
                that.game.state.start('scoreboard');
            }
        });
    }
}

module.exports = playState;