class Enemy extends Phaser.Sprite {
    constructor (game, x, y, weapon, image, points) {
        super(game, x, y, image);

        this.weapon = weapon;
        this.points = points;
    }

    update () {
        let canShoot = (
            this.parent.visible &&
            this.game.rnd.integerInRange(0, Math.max(80, 40 * this.parent.countLiving())) === 0
        );
        if (canShoot) {
            this.weapon.fire(
                this.x + this.width / 2 - 1,
                this.y + this.height + 2
            )
        }
    }
}

module.exports = Enemy;
