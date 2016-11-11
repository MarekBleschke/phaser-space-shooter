function pauseScreen(game, pauseKey) {
    // Pause game
    var pausedText;
    var pausedBG;

    pauseKey.onDown.add(() => {
        game.paused = !game.paused;
        if (game.paused) {
            pausedBG = game.add.graphics(0, 0);
            pausedBG.beginFill('000000', 1);
            pausedBG.drawRect(0, 0, game.width, game.height);
            pausedBG.alpha = 0.7;
            pausedBG.endFill();

            pausedText = game.add.text(
                game.width / 2,
                game.height / 2,
                'PAUSED',
                {fontSize: '32px', fill: '#FFF'}
            );
            pausedText.anchor.set(0.5);
        } else {
            pausedText.destroy();
            pausedBG.destroy();
        }
    });
}

module.exports = pauseScreen;
