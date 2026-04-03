class MyScene extends Phaser.Scene {

    public preload ()
    {
        this.load.atlas('cards', 'assets/atlas/cards.png', 'assets/atlas/cards.json');
    }

    public create ()
    {
        let c = this.add.container();

        c.setSize(300, 200);

        let sprite = this.add.sprite(400, 300, 'cards', 'clubs3');

        sprite.setInteractive();
    }
}

let config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: MyScene
};

let game = new Phaser.Game(config);
