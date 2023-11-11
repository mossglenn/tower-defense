import Phaser from 'phaser';
import LevelScene from './scenes/LevelScene.ts';
import Enemy from './Enemy.ts';
import Bullet from './Bullet.ts';

export default class Tower extends Phaser.Physics.Arcade.Image {
  scene: LevelScene;
  x: number;
  y: number;
  nextTic = 0;
  bulletSpeed = 1000;

  constructor(scene: LevelScene, x: number, y: number, texture = 'tower') {
    super(scene, x, y, texture);
    this.scene = scene;
    this.x = x;
    this.y = y;
  }
  update(time: number, _delta: number): void {
    if (time > this.nextTic) {
      this.fire();
      this.nextTic = time + 600;
    }
  }

  selectEnemy(): Enemy | undefined {
    if (this.scene.enemies != undefined) {
      const enemyUnits: Enemy[] =
        this.scene.enemies!.children.getArray() as Enemy[];
      const furthestEnemy = enemyUnits.reduce((prev, current) =>
        prev && prev.follower.t > current.follower.t ? prev : current
      );
      return furthestEnemy;
    }
    return undefined;
  }

  shootAtEnemy(enemy: Enemy) {
    const bullet = this.scene.bullets?.get(this.x, this.y) as Bullet;
    if (bullet) {
      bullet.setActive(true);
      bullet.setVisible(true);
      console.log("here's the bullet");
      console.log(bullet);
      this.scene.fireBullet(bullet, enemy, this.bulletSpeed);
    }
  }

  fire() {
    const target = this.selectEnemy();
    if (target) {
      this.shootAtEnemy(target);
    }
  }
}
