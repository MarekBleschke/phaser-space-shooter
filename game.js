var enemies;
var cursors;
var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', {preload: preload, create: create, update: update});
var player;
var playerBullets;
var enemyBullets;
var nextFire = 0;
var playerLives = 3;
var score = 0;
var scoreText;
var livesText;

var playerConfig = {
    speed: 150,
    bulletSpeed: 200,
    fireRate: 350
};

var enemiesConfig = {
    cols: 11,
    rows: 6,
    xSpacing: 30,
    ySpacing: 20,
    leftPadding: 70,
    topPadding: 100,
    bulletSpeed: 150,
    fireRate: 15,
    points: 10
};

function preload() {
    game.load.image('player', 'assets/player.png');
    game.load.image('enemy', 'assets/enemy.png');
    game.load.image('bullet-player', 'assets/bullet-player.png');
    game.load.image('bullet-enemy', 'assets/bullet-enemy.png');
}

function create() {
    player = game.add.sprite(
        (game.world.width / 2) - 16 ,
        game.world.height - 36,
        'player'
    );
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    playerBullets = game.add.group();
    playerBullets.enableBody = true;

    cursors = game.input.keyboard.addKeys({
        'left': Phaser.KeyCode.LEFT,
        'right': Phaser.KeyCode.RIGHT,
        'space': Phaser.KeyCode.SPACEBAR
    });

    enemies = game.add.group();
    enemies.enableBody = true;

    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;

    for (var row = 0; row < enemiesConfig.rows; row++) {
        for (var col = 0; col < enemiesConfig.cols; col++) {
            enemies.create(
                col * (32 + enemiesConfig.xSpacing) + enemiesConfig.leftPadding,
                row * (15 + enemiesConfig.ySpacing) + enemiesConfig.topPadding,
                'enemy'
            );
        }
    }

    scoreText = game.add.text(16, 16, 'Score: 0', {fontSize: '18px', fill: '#FFF'});
    livesText = game.add.text(500, 16, 'Lives: ' + playerLives, {fontSize: '18px', fill: '#FFF'});
}

function update() {
    player.body.velocity.x = 0;

    if (playerLives > 0) {
        if (cursors.left.isDown) {
            player.body.velocity.x = -playerConfig.speed;
        } else if (cursors.right.isDown) {
            player.body.velocity.x = playerConfig.speed;
        }

        if (cursors.space.isDown && game.time.time > nextFire) {
            var bullet = playerBullets.create(
                player.position.x + player.width / 2 - 3,
                player.position.y - 12,
                'bullet-player'
            );
            bullet.body.velocity.y = -playerConfig.bulletSpeed;
            bullet.checkWorldBounds = true;
            bullet.events.onOutOfBounds.add(function (bullet) {
                bullet.destroy();
            }, this);
            nextFire = this.game.time.time + playerConfig.fireRate;
        }

        game.physics.arcade.overlap(playerBullets, enemies, function (bullet, enemy) {
            bullet.kill();
            enemy.destroy();
            score += enemiesConfig.points;
            scoreText.text = 'Score: ' + score;
        });
    }

    if (Math.random() > (1 - enemiesConfig.fireRate / 1000)) {
        var enemyToShootIndex = Math.floor(Math.random() * (enemies.children.length));
        var enemyToShoot = enemies.children[enemyToShootIndex];
        // TODO: error when there are no enemies left
        var enemyBullet = enemyBullets.create(
            enemyToShoot.x + enemyToShoot.width / 2 - 1,
            enemyToShoot.y + enemyToShoot.height + 2,
            'bullet-enemy'
        );
        enemyBullet.body.velocity.y = enemiesConfig.bulletSpeed;
        enemyBullet.checkWorldBounds = true;
        enemyBullet.events.onOutOfBounds.add(function (bullet) { bullet.destroy(); }, this);
    }

    game.physics.arcade.overlap(player, enemyBullets, function (player, enemyBullet) {
        enemyBullet.kill();
        playerLives -= 1;
        livesText.text = 'Lives: ' + playerLives;
        if (playerLives < 1) {
            // TODO: kill player bullets or allow to collide them with enemies
            player.kill();
        }
    });
}
