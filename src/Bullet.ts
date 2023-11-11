import Phaser from 'phaser';
import LevelScene from './scenes/LevelScene.ts';

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  scene: LevelScene;
  x = 0;
  y = 0;
  key = 'bullet';

  constructor(scene: LevelScene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    this.scene = scene;
    this.x = x;
    this.y = y;
    this.key = key;
  }
}
