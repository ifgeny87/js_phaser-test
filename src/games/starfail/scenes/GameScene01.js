import Phaser from 'phaser';

export default class GameScene01 extends Phaser.Scene {
  constructor() {
    super({ key: GameScene01.name });
  }

  init(params) {
    this.delta = 1000;
    this.lastStarTime = 0;
    this.starsCaught = 0;
    this.starsFallen = 0;
  }

  preload() {
    this.load.setBaseURL('/assets');
    this.load.image('star', 'star.png');
    this.load.image('sand', 'sand.jpg');
  }

  create() {
    // create sprite group in line
    this.sand = this.physics.add.staticGroup({ key: 'sand', frameQuantity: 20 });
    Phaser.Actions.PlaceOnLine(this.sand.getChildren(), new Phaser.Geom.Line(20, 580, 820, 580));
    // reset boundings
    this.sand.refresh();
    this.info = this.add.text(10, 10, 'Loading...', { font: '24px Arial Bold', fill: '#fbfbac' });
  }

  update(time) {
    const diff = time - this.lastStarTime;
    if (diff > this.delta) {
      this.lastStarTime = time;
      if (this.delta > 500) {
        this.delta -= 20;
      }
      this.emitStar();
    }
    this.info.text = `${this.starsCaught} caught - ${this.starsFallen} fallen (max 3)`;
  }

  onClick(star) {
    star.setTint(0x00ff00);
    star.setVelocity(0, 0);
    this.starsCaught += 1;
    this.time.delayedCall(400, (star1) => {
      star1.setAlpha(.5);
      star1.setVelocity(0, -1000);
      this.time.delayedCall(500, (star2) => star2.destroy(), [star1], this);
    }, [star], this);
  }

  onFall(star) {
    star.setTint(0xff0000);
    this.starsFallen += 1;
    this.time.delayedCall(400, (star1) => star1.destroy(), [star], this);
    if (this.starsFallen > 2) {
      this.scene.start('ScoreScene', { starsCaught: this.starsCaught });
    }
  }

  emitStar() {
    const x = Phaser.Math.Between(25, 775);
    const y = 0;
    const star = this.physics.add.image(x, y, 'star');
    const size = Phaser.Math.Between(25, 50);
    star.setDisplaySize(size, size);
    star.setVelocity(0, 100);
    star.setInteractive();
    star.on('pointerdown', () => this.onClick(star), this);
    this.physics.add.collider(star, this.sand, () => this.onFall(star), null, this);

  }
}
