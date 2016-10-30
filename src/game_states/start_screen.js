class StartScreenState {
    create (game) {
        game.add.text(
            game.width / 2,
            200,
            'Space Shooter',
            {fontSize: '40px', fill: '#FFF'}
        ).anchor.set(0.5);

        game.add.text(
            game.width / 2,
            350,
            'Press \'Spacebar\' to start playing',
            {fontSize: '24px', fill: '#FFF'}
        ).anchor.set(0.5);

        let spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spacebar.onDown.add(() => game.state.start('play'));
    }
}

module.exports = StartScreenState;
