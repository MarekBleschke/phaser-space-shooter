var Weapons = require('./weapons');

class Enemy extends Phaser.Sprite {
    constructor (game, x, y, image, weapon, points) {
        super(game, x, y, image);

        this.weapon = weapon;
        this.points = points;
    }

    update () {
        let canShoot = this.game.rnd.integerInRange(0, Math.max(80, 40 * this.parent.countLiving())) === 0;
        if (canShoot) {
            this.weapon.fire(
                this.x + this.width / 2 - 1,
                this.y + this.height + 2
            )
        }
    }
}

class Wave extends Phaser.Group {
    constructor(game) {
        super(game, game.world, 'Wave', false, true, Phaser.Physics.ARCADE);

        this.rows = 6;
        this.cols = 11;
        this.xSpacing = 30;
        this.ySpacing = 20;
        this.leftPadding = 70;
        this.topPadding = 100;

        this.enemiesWeapons = [];

        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.cols; col++) {
                var enemyWeapon = new Weapons.Weapon(game, -200, 250, 'bullet-enemy');
                this.enemiesWeapons.push(enemyWeapon);

                this.add(new Enemy(
                    game,
                    col * (32 + this.xSpacing) + this.leftPadding,
                    row * (15 + this.ySpacing) + this.topPadding,
                    'enemy',
                    enemyWeapon,
                    10
                ), true)
            }
        }
    }
}

class Wave2 extends Phaser.Group {
    constructor (game) {
        super(game, game.world, 'Wave2', false, true, Phaser.Physics.ARCADE);

        this.rows = 6;
        this.cols = 11;
        this.xSpacing = 30;
        this.ySpacing = 20;
        this.leftPadding = 70;
        this.topPadding = 100;

        this.enemiesWeapons = [];

        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.cols; col++) {
                var enemyWeapon = new Weapons.Weapon(game, -200, 250, 'bullet-enemy');
                this.enemiesWeapons.push(enemyWeapon);

                this.add(new Enemy(
                    game,
                    col * (32 + this.xSpacing) + this.leftPadding,
                    row * (15 + this.ySpacing) + this.topPadding,
                    'enemy2',
                    enemyWeapon,
                    10
                ), true)
            }
        }
    }
}

module.exports.Wave = Wave;
module.exports.Wave2 = Wave2;
