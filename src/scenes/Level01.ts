import LevelScene from './LevelScene.ts';
import Enemy from '../Enemy.ts';

export default class Level01 extends LevelScene {
  constructor() {
    super('level01');
  }

  create() {
    this.add.text(200, 200, 'LEVEL 1');

    this.path = this.add.path(96, -32);
    this.path.lineTo(96, 164);
    this.path.lineTo(480, 164);
    this.path.lineTo(480, 554);

    const graphics = this.add.graphics();
    graphics.lineStyle(3, 0xffffff, 1);
    this.path.draw(graphics);

    this.enemies = this.add.group({
      classType: Enemy,
      defaultKey: 'sprites',
      defaultFrame: 'enemy',
      runChildUpdate: true
    });
  }
  update(time: number, _delta: number): void {
    if (time > this.nextEnemy) {
      const enemy = this.enemies!.get();
      if (enemy) {
        enemy.setActive(true);
        enemy.setVisible(true);
        enemy.startOnPath();
        this.nextEnemy = time + 2000;
      }
    }
  }
}
