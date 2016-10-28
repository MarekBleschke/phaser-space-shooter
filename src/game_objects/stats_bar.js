class StatsBar {
    constructor(game, score, lives) {
        this._getScoreText = score => `Score: ${score}`;
        this._getLivesText = lives => `Lives: ${lives}`;

        this._scoreText = game.add.text(
            16,
            16,
            this._getScoreText(score),
            {fontSize: '18px', fill: '#FFF'}
        );
        this._livesText = game.add.text(
            500,
            16,
            this._getLivesText(lives),
            {fontSize: '18px', fill: '#FFF'}
        );
    }

    updateScore(score) {
        this._scoreText.text = this._getScoreText(score);
    }

    updateLives(lives) {
        this._livesText.text = this._getLivesText(lives);
    }
}

module.exports = StatsBar;
