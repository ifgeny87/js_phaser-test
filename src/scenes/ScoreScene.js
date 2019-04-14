import Phaser from 'phaser';

export default class ScoreScene extends Phaser.Scene {
  constructor() {
    super({ key: ScoreScene.name });
  }

  init(params) {
    this.score = params.starsCaught;
  }

  create() {
    this.add.text(200, 250, `Your score: ${this.score}`, { font: '48px Arial Bold', fill: '#fbfbac' });
    this.add.text(300, 350, 'Restart', { font: '24px Arial Bold', fill: '#fbfbac' });
    this.input.on('pointerdown', () => this.scene.start('HelloScene'), this);
  }
}
