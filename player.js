var Player = function (game, cursors, weapon) {
    Phaser.Sprite.call(
        this,
        game,
        // TODO: make calculations based on player size or check anchor property
        (game.world.width / 2) - 16 ,
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

    // Add sprite to the game.
    game.add.existing(this);

    return this;
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    this.body.velocity.x = 0;

    if (this.lives > 0) {
        if (this.cursors.left.isDown) {
            this.body.velocity.x = -this.speed;
        } else if (this.cursors.right.isDown) {
            this.body.velocity.x = this.speed;
        }
    }

    if (this.cursors.space.isDown) {
        this.weapon.fire(this.x, this.y);
    }
};

Player.prototype.handleHit = function () {
    this.lives -= 1;
    if (this.lives < 1) {
        this.kill();
    }
};
