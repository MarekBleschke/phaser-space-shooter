var storage = require('../tools/storage.js');

class scoreboardState {
    create () {
        this.game.add.text(
            this.game.width / 2 - 80,
            50,
            'SCOREBOARD',
            {fontSize: '28px', fill: '#FFF'}
        );
        let scores = storage.getObject('scores');
        for (let [index, score] of scores.entries()) {
            this.game.add.text(
                this.game.width / 2 - 80,
                65 + 40 * (index + 1),
                `${index + 1}.     ${score}`,
                {fontSize: '18px', fill: '#FFF'}
            );
        }
    }
}

module.exports = scoreboardState;
