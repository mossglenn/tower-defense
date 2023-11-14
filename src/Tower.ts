import Phaser from 'phaser';
import LevelScene from './scenes/LevelScene.ts';
import Enemy from './Enemy.ts';
import Bullet from './Bullet.ts';

export default class Tower extends Phaser.Physics.Arcade.Sprite {
  scene: LevelScene;
  x: number;
  y: number;
  nextTic = 0;
  ticsBetweenShots = 1000;

  constructor(scene: LevelScene, x: number, y: number, texture = 'tower') {
    super(scene, x, y, texture);
    this.scene = scene;
    this.x = x;
    this.y = y;
  }
  update(time: number, _delta: number): void {
    if (time > this.nextTic) {
      this.fire();
      this.nextTic = time + this.ticsBetweenShots;
    }
  }

  selectEnemy(): Enemy | undefined {
    if (this.scene.enemies != undefined) {
      const enemyUnits: Enemy[] = this.scene.enemies!.getMatching(
        'visible',
        true
      );
      if (enemyUnits.length > 0) {
        const furthestEnemy = enemyUnits.reduce((prev, current) =>
          prev && prev.follower.t > current.follower.t ? prev : current
        );
        return furthestEnemy;
      }
    }
    return undefined;
  }

  shootAtEnemy(enemy: Enemy) {
    const bullet = this.scene.bullets?.get(this.x, this.y) as Bullet;
    if (bullet) {
      bullet.setActive(true);
      bullet.setVisible(true);

      this.scene.physics.moveToObject(bullet, enemy, bullet.speed);
    }
  }

  fire() {
    const target = this.selectEnemy();
    if (target != undefined) {
      this.shootAtEnemy(target);
    }
  }
}
