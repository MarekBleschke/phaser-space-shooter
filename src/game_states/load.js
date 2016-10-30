class LoadState {
    preload (game) {
        game.load.image('player', 'assets/player.png');
        game.load.image('enemy', 'assets/enemy.png');
        game.load.image('enemy2', 'assets/enemy2.png');
        game.load.image('bullet-player', 'assets/bullet-player.png');
        game.load.image('bullet-enemy', 'assets/bullet-enemy.png');
    }

    create (game) {
        game.state.start('startScreen');
    }
}

module.exports = LoadState;