class Bullet extends Phaser.Sprite {
    constructor(game, image) {
        super(game, 0, 0, image);

        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;

        this.exists = false;

        return this;
    }

    fire(x, y, speed) {
        this.reset(x, y);
        this.body.velocity.y = -speed;
    }
}

class Weapon extends Phaser.Group {
    constructor(game, bulletSpeed, fireRate, bulletImage) {
        super(game, game.world, 'Weapon', false, true, Phaser.Physics.ARCADE);

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
    }

    fire(x, y) {
        if (this.game.time.time > this.nextFire) {
            this.getFirstExists(false).fire(x, y, this.bulletSpeed);
            this.nextFire = this.game.time.time + this.fireRate;
        }
    }
}

module.exports.Weapon = Weapon;
