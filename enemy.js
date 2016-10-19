var Enemy = function (game, x, y, weapon, points) {
    Phaser.Sprite.call(this, game, x, y, 'enemy');

    this.weapon = weapon;
    this.points = points;
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function () {
    if (Math.random() > (1 - 1 / 1000)) {
        this.weapon.fire(
            this.x + this.width / 2 - 1,
            this.y + this.height + 2
        )
    }
};
