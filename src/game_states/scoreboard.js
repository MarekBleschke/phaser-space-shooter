var storage = require('../tools/storage.js');

class ScoreboardState {
    create (game) {
        game.add.text(
            game.width / 2,
            50,
            'SCOREBOARD',
            {fontSize: '28px', fill: '#FFF'}
        ).anchor.set(0.5);

        let scores = storage.getObject('scores');
        for (let [index, score] of scores.entries()) {
            game.add.text(
                game.width / 2,
                65 + 40 * (index + 1),
                `${index + 1}.     ${score}`,
                {fontSize: '18px', fill: '#FFF'}
            ).anchor.set(0.5);
        }

        game.add.text(
            game.width / 2,
            550,
            'Press \'Spacebar\' to start playing',
            {fontSize: '24px', fill: '#FFF'}
        ).anchor.set(0.5);

        let spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spacebar.onDown.add(() => game.state.start('play'));
    }
}

module.exports = ScoreboardState;
