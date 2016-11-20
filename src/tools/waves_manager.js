class WavesManager {
    constructor ({game, waves}) {
        this.game = game;
        this.waves = waves;
        this._currentWaveNumber = 0;
    }

    next () {
        let Wave = this.waves[this._currentWaveNumber];
        let wave = new Wave(this.game);
        this._currentWaveNumber += 1;
        return wave;
    }
}

module.exports = WavesManager;