import Phaser from 'phaser';
import LevelScene from './scenes/LevelScene.ts';

export default class Enemy extends Phaser.Physics.Arcade.Image {
  scene: LevelScene;
  x: number;
  y: number;
  path: Phaser.Curves.Path;
  follower = { t: 0, vec: new Phaser.Math.Vector2() };
  SPEED = 1 / 10000;

  constructor(scene: LevelScene, x: number, y: number, texture = 'enemy') {
    super(scene, x, y, texture);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.path = scene.path!;
  }

  startOnPath() {
    this.follower.t = 0;
    this.path.getPoint(this.follower.t, this.follower.vec);
    this.setPosition(this.follower.vec.x, this.follower.vec.y);
  }

  update(_time: number, delta: number): void {
    this.follower.t += this.SPEED * delta;
    this.path.getPoint(this.follower.t, this.follower.vec);
    this.setPosition(this.follower.vec.x, this.follower.vec.y);
    if (this.follower.t >= 1) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}
