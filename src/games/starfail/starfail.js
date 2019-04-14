import Phaser from 'phaser';
import * as scenes from './scenes';

const config = {
  title: 'Starfall',
  width: 800,
  height: 600,
  parent: 'app',
  scene: [scenes.HelloScene, scenes.GameScene01, scenes.ScoreScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  backgroundColor: '#000033',
};

class StarFallGame extends Phaser.Game {
  constructor(config) {
    super(config);
    // this.gameScene = new GameScene01();
    // this.gameScene.start();
  }
}

window.onload = () => {
  const game = new StarFallGame(config);
};
