import Phaser from 'phaser';

import PreloadScene from './scenes/PreloadScene.ts';
import LevelScene from './scenes/LevelScene.ts';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'app',
  width: 768,
  height: 576,
  backgroundColor: '#4488AA',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  },
  scene: [PreloadScene, LevelScene]
};

export default new Phaser.Game(config);
