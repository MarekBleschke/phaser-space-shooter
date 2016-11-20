class SimpleWave extends Phaser.Group {
    constructor({game, name, rows, cols, enemyFactory, weapon}) {
        super(game, game.world, name, false, true, Phaser.Physics.ARCADE);

        this.visible = false;
        this.exists = false;

        this.rows = rows;
        this.cols = cols;

        // TODO: some global game config?
        this.padding = {
            top: 100,
            bottom: 200,
            left: 95,
            right: 70
        };

        this.xSpacing = Math.floor((game.world.width - this.padding.left - this.padding.right) / this.cols);
        this.ySpacing = Math.floor((game.world.height - this.padding.top - this.padding.bottom) / this.rows);

        this.collidingWithPlayer = weapon;

        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.cols; col++) {
                this.add(enemyFactory(
                    game,
                    col * this.xSpacing + this.padding.left,
                    row * this.ySpacing + this.padding.top,
                    weapon
                ), true)
            }
        }

        this.enterAnimation();
    }

    destroy (...args) {
        this.collidingWithPlayer.destroy();
        super.destroy(...args);
    }

    enterAnimation () {
        let text = this.game.add.text(
            this.game.width / 2,
            200,
            this.name,
            {fontSize: '30px', fill: '#FFF'}
        );
        text.anchor.set(0.5);

        this.game.time.events.add(
            Phaser.Timer.SECOND * 2,
            () => {
                text.destroy();
                this.visible = true;
                this.exists = true;
            }
        )
    }
}

module.exports = SimpleWave;