var storage = require('../tools/storage');

class Player extends Phaser.Sprite {
    constructor (game, cursors, weapon) {
        super(
            game,
            // TODO: make calculations based on player size or check anchor property
            (game.world.width / 2) - 16,
            game.world.height - 36,
            'player'
        );

        this.game = game;
        this.cursors = cursors;
        this.weapon = weapon;

        // Phaser player settings
        this.game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;

        // Custom player settings;
        this.lives = 3;
        this.speed = 150;

        // Ingame player state info
        this.score = 0;

        // Add sprite to the game.
        game.add.existing(this);

        return this;
    }

    update () {
        this.body.velocity.x = 0;

        if (this.lives > 0) {
            if (this.cursors.left.isDown) {
                this.body.velocity.x = -this.speed;
            } else if (this.cursors.right.isDown) {
                this.body.velocity.x = this.speed;
            }
        }

        if (this.cursors.space.isDown) {
            this.weapon.fire(this.x + this.width / 2 - 4, this.y - 12);
        }
    }

    updateScore (score) {
        this.score += score;
        return this.score;
    }

    handleHit () {
        this.lives -= 1;
        if (this.lives < 1) {
            this.kill();

            // TODO: move to score board (when it's ready)
            let scores = storage.getObject('scores') || [];
            scores.push(this.score);
            scores = scores.sort((a, b) => b - a);
            if (scores.length > 10) {
                scores.length = 10;
            }
            storage.setObject('scores', scores);
        }
    }
}

module.exports = Player;
