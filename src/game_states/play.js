let Weapons = require('./../game_objects/weapons');
let Player = require('./../game_objects/player');
let StatsBar = require('./../game_objects/stats_bar');
let pauseScreen = require('./../game_objects/pause_screen');
let WavesManager = require('./../tools/waves_manager');

// TODO: make it with single import
let Wave1 = require('../levels/wave_1');
let Wave2 = require('../levels/wave_2');

class PlayState {
    create (game) {
        this.wave = undefined;

        this.cursors = game.input.keyboard.addKeys({
            'left': Phaser.KeyCode.LEFT,
            'right': Phaser.KeyCode.RIGHT,
            'space': Phaser.KeyCode.SPACEBAR,
            'p': Phaser.KeyCode.P,
            // DEBUG
            'k': Phaser.KeyCode.K
        });

        this.player = new Player(
            game,
            this.cursors,
            new Weapons.Weapon(game, 200, 250, 'bullet-player')
        );

        this.wavesManager = new WavesManager({
            game: game,
            waves: [Wave1, Wave2]
        });

        this.startNextWave();

        this.statsBar = new StatsBar(game, this.player.score, this.player.lives);

        pauseScreen(game, this.cursors.p);

        // DEBUG
        this.cursors.k.onDown.add(() => this.wave.callAll('destroy'));
    }

    update (game) {
        var that = this; // TODO: better solution for this

        if (this.wave.countLiving() === 0) {
            this.startNextWave();
        }

        game.physics.arcade.overlap(this.player.weapon, this.wave, function (bullet, enemy) {
            let score = that.player.updateScore(enemy.points);
            that.statsBar.updateScore(score);
            bullet.kill();
            enemy.destroy();
        });

        game.physics.arcade.overlap(this.player, this.wave.collidingWithPlayer, function (player, enemyBullet) {
            enemyBullet.kill();
            player.handleHit();
            that.statsBar.updateLives(player.lives);
            if (!player.alive) {
                that.game.state.start('scoreboard');
            }
        });
    }

    startNextWave () {
        if (this.wave) {
            this.wave.destroy();
        }
        this.player.killBullets();
        this.wave = this.wavesManager.next();
    }
}

module.exports = PlayState;