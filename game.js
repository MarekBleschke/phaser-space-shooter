var game = new Phaser.Game(800, 600, Phaser.CANVAS, '');

var score = 0;

var enemiesConfig = {
    cols: 11,
    rows: 6,
    xSpacing: 30,
    ySpacing: 20,
    leftPadding: 70,
    topPadding: 100
};

var Game = function () {
    this.player = null;

    this.cursors = null;
    this.enemies = null;

    this.scoreText = null;
    this.livesText = null;
};

Game.prototype = {

    preload: function () {
        game.load.image('player', 'assets/player.png');
        game.load.image('enemy', 'assets/enemy.png');
        game.load.image('bullet-player', 'assets/bullet-player.png');
        game.load.image('bullet-enemy', 'assets/bullet-enemy.png');
    },

    create: function () {
        this.cursors = this.game.input.keyboard.addKeys({
            'left': Phaser.KeyCode.LEFT,
            'right': Phaser.KeyCode.RIGHT,
            'space': Phaser.KeyCode.SPACEBAR
        });

        this.player = new Player(
            this.game,
            this.cursors,
            new Weapon(game, 200, 250, 'bullet-player')
        );

        this.enemies = game.add.group();
        this.enemies.enableBody = true;

        this.enemiesWeapons = [];

        for (var row = 0; row < enemiesConfig.rows; row++) {
            for (var col = 0; col < enemiesConfig.cols; col++) {
                var enemyWeapon = new Weapon(game, -200, 250, 'bullet-enemy');
                // TODO: maybe wave property or some better way of handling shooting by enemies
                this.enemiesWeapons.push(enemyWeapon);

                this.enemies.add(new Enemy(
                    game,
                    col * (32 + enemiesConfig.xSpacing) + enemiesConfig.leftPadding,
                    row * (15 + enemiesConfig.ySpacing) + enemiesConfig.topPadding,
                    enemyWeapon,
                    10
                ), true)
            }
        }

        this.scoreText = game.add.text(16, 16, 'Score: 0', {fontSize: '18px', fill: '#FFF'});
        this.livesText = game.add.text(500, 16, 'Lives: ' + this.player.lives, {fontSize: '18px', fill: '#FFF'});
    },

    update: function () {
        var that = this; // TODO: better solution for this

        this.game.physics.arcade.overlap(this.player.weapon, this.enemies, function (bullet, enemy) {
            score += enemy.points;
            that.scoreText.text = 'Score: ' + score;
            bullet.kill();
            enemy.destroy();
        });

        this.game.physics.arcade.overlap(this.player, this.enemiesWeapons, function (player, enemyBullet) {
            enemyBullet.kill();
            player.handleHit();
            that.livesText.text = 'Lives: ' + that.player.lives;
        });
    }
};

game.state.add('Game', Game, true);
