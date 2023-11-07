import Phaser from 'phaser';
import LevelScene from './scenes/LevelScene.ts';

export default class Tower extends Phaser.GameObjects.Image {
  scene: LevelScene;
  x: number;
  y: number;
  nextTic = 0;

  constructor(scene: LevelScene, x: number, y: number, texture = 'tower') {
    super(scene, x, y, texture);
    this.scene = scene;
    this.x = x;
    this.y = y;
  }
  update(time: number, _delta: number): void {
    if (time > this.nextTic) {
      this.nextTic = time + 1000;
    }
  }
}
