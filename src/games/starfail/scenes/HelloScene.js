import Phaser from 'phaser';

export default class HelloScene extends Phaser.Scene {
  constructor() {
    super({ key: HelloScene.name });
  }

  create() {
    this.add.text(150, 200, 'Starfail', { font: '128px Arial Bold', fill: '#fbfbac' });
    this.add.text(300, 350, 'Start', { font: '24px Arial Bold', fill: '#fbfbac' });
    this.input.on('pointerdown', () => this.scene.start('GameScene01'), this);
  }
}
