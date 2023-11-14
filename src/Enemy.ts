import Phaser from 'phaser';
import LevelScene from './scenes/LevelScene.ts';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  scene: LevelScene;
  x: number;
  y: number;
  path: Phaser.Curves.Path;
  follower = { t: 0, vec: new Phaser.Math.Vector2() };
  startingHp = 100;
  hp: number;
  speed: number;

  constructor(
    scene: LevelScene,
    x = 100,
    y = 100,
    texture = 'enemy',
    startingHp = 100,
    speed = 1 / 10000
  ) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.path = scene.path!;
    this.startingHp = startingHp;
    this.hp = startingHp;
    this.speed = speed;
  }

  startOnPath() {
    this.follower.t = 0;
    this.path.getPoint(this.follower.t, this.follower.vec);
    this.setPosition(this.follower.vec.x, this.follower.vec.y);
  }

  damage(damagePoints: number) {
    const newHp = this.hp - damagePoints;
    if (newHp <= 0) {
      this.setVisible(false);
      this.setActive(false);
    } else {
      this.hp = newHp;
      console.log('reducing health to ' + this.hp);
    }
  }

  update(_time: number, delta: number): void {
    this.follower.t += this.speed * delta;
    this.path.getPoint(this.follower.t, this.follower.vec);
    this.setPosition(this.follower.vec.x, this.follower.vec.y);
    if (this.follower.t >= 1) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}
