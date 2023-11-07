import Phaser from 'phaser';

import PreloadScene from './scenes/PreloadScene.ts';
import Level01 from './scenes/Level01.ts';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'app',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: [PreloadScene, Level01]
};

export default new Phaser.Game(config);
