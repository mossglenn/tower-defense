import Phaser from 'phaser';
import Enemy from './Enemy.ts';

export default class Enemies extends Phaser.Physics.Arcade.Group {
  constructor(
    scene: Phaser.Scene,
    groupConfig: Phaser.Types.GameObjects.Group.GroupCreateConfig = {
      key: 'enemy',
      classType: Enemy
    }
  ) {
    super(scene.physics.world, scene, groupConfig);
  }
  spawn(x = -32, y = -32, texture = 'enemy') {
    const enemy: Enemy = this.get(x, y, texture);
    if (enemy) {
      enemy.setActive(true);
      enemy.setVisible(true);
      enemy.startOnPath();
      return enemy;
    }
  }
  despawn(enemy: Enemy) {
    this.killAndHide(enemy);
  }
}
