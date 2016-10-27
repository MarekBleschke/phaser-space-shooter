var Bullet = function (game, image) {
    Phaser.Sprite.call(this, game, 0, 0, image);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;

    this.exists = false;

    return this;
};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fire = function (x, y, speed) {
    this.reset(x, y);
    this.body.velocity.y = -speed;
};

var Weapon = function (game, bulletSpeed, fireRate, bulletImage) {
    Phaser.Group.call(this, game, game.world, 'Weapon', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = bulletSpeed;
    // TODO: inverse fire rate - higher is faster
    this.fireRate = fireRate;
    this.bulletImage = bulletImage;

    // Initialize bullets.
    for (var i = 0; i < 30; i++) {
        this.add(new Bullet(game, this.bulletImage), true);
    }

    return this;
};

Weapon.prototype = Object.create(Phaser.Group.prototype);
Weapon.prototype.constructor = Weapon;

Weapon.prototype.fire = function (x, y) {
    if (this.game.time.time > this.nextFire) {
        this.getFirstExists(false).fire(x, y, this.bulletSpeed);
        this.nextFire = this.game.time.time + this.fireRate;
    }
};

module.exports.Weapon = Weapon;
