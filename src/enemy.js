var Weapons = require('./weapons.js');

var Enemy = function (game, x, y, image ,weapon, points) {
    Phaser.Sprite.call(this, game, x, y, image);

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


var Wave = function (game) {
    Phaser.Group.call(this, game, game.world, 'Wave', false, true, Phaser.Physics.ARCADE);

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
};

Wave.prototype = Object.create(Phaser.Group.prototype);
Wave.prototype.constructor = Wave;


var Wave2 = function (game) {
    Phaser.Group.call(this, game, game.world, 'Wave2', false, true, Phaser.Physics.ARCADE);

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
};

Wave2.prototype = Object.create(Phaser.Group.prototype);
Wave2.prototype.constructor = Wave2;


module.exports.Wave = Wave;
module.exports.Wave2 = Wave2;
