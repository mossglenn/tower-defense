import LevelScene from './LevelScene.ts';
import Enemy from '../Enemy.ts';
import Tower from '../Tower.ts';

export default class Level01 extends LevelScene {
  constructor() {
    super('level01');
  }

  drawPath(): Phaser.Curves.Path {
    this.path = this.add.path(96, -32);
    this.path.lineTo(96, 164);
    this.path.lineTo(480, 164);
    this.path.lineTo(480, 554);
    return this.path;
  }

  create() {
    const graphics = this.add.graphics();
    this.drawGrid(graphics);

    this.add.text(200, 200, 'LEVEL 1');

    graphics.lineStyle(3, 0xffffff, 1);
    this.path.draw(graphics);

    this.enemies = this.add.group({
      classType: Enemy,
      defaultKey: 'sprites',
      defaultFrame: 'enemy',
      runChildUpdate: true
    });

    this.towers = this.add.group({
      classType: Tower,
      defaultKey: 'sprites',
      defaultFrame: 'turret',
      runChildUpdate: true
    });

    this.input.on('pointerdown', this.placeTower);
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
  placeTower(pointer: Phaser.Input.Pointer) {
    const i = Math.floor(pointer.x / 64);
    const j = Math.floor(pointer.y / 64);
    if (this.towerMap[i][j] === 0) {
      const tower = this.towers?.get();
      if (tower != undefined) {
        tower.setActive(true);
        tower.setVisible(true);
        tower.place(i, j);
      }
    }
  }

  //   this.towerMap = [
  //   [0, -1, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, -1, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, -1, -1, -1, -1, -1, -1, -1, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, -1, 0, 0]
  // ];
}
