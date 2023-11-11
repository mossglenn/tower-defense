import Phaser from 'phaser';
import Enemy from '../Enemy.ts';
import Tower from '../Tower.ts';
import Bullet from '../Bullet.ts';

export default class LevelScene extends Phaser.Scene {
  enemies?: Phaser.Physics.Arcade.Group;
  towers?: Phaser.Physics.Arcade.Group;
  bullets?: Phaser.Physics.Arcade.Group;
  path?: Phaser.Curves.Path;
  //use map like [row][col]
  towerMap = [
    [0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0]
  ];
  nextEnemy = 0;

  constructor() {
    super('levelscene');
  }

  create() {
    const graphics = this.add.graphics();
    this.drawGrid(graphics);
    this.drawPath(graphics);

    this.enemies = this.physics.add.group({
      classType: Enemy,
      defaultKey: 'enemy',
      runChildUpdate: true
    });

    this.towers = this.physics.add.group({
      classType: Tower,
      defaultKey: 'tower',
      runChildUpdate: true
    });

    this.bullets = this.physics.add.group({
      classType: Bullet,
      defaultKey: 'bullet',
      runChildUpdate: true
    });

    this.input.on('pointerdown', this.placeTower, this);
    console.log(this.enemies);

    console.log(this.towers);
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
    const col = Math.floor(pointer.x / 64);
    const row = Math.floor(pointer.y / 64);

    if (this.towerMap[row][col] === 0) {
      const tower = this.towers!.get(col * 64 + 32, row * 64 + 32); //place in middle of row/col
      if (tower) {
        this.towerMap[row][col] = 1;
      } else {
        console.log('problem creating tower');
      }
    } else {
      console.log('cannot place a tower there');
    }
  }

  drawPath(graphics: Phaser.GameObjects.Graphics): Phaser.Curves.Path {
    this.path = this.add.path(96, -32);
    this.path.lineTo(96, 164);
    this.path.lineTo(480, 164);
    this.path.lineTo(480, 576 + 32);
    graphics.lineStyle(3, 0xffffff, 1);
    this.path.draw(graphics);
    return this.path;
  }
  getPath(): Phaser.Curves.Path {
    const levelPath =
      this.path != undefined ? this.path! : new Phaser.Curves.Path();
    return levelPath;
  }

  drawGrid(graphics: Phaser.GameObjects.Graphics) {
    graphics.lineStyle(1, 0x0000ff, 0.8);
    for (var i = 0; i < 9; i++) {
      graphics.moveTo(0, i * 64);
      graphics.lineTo(768, i * 64);
    }
    for (var j = 0; j < 12; j++) {
      graphics.moveTo(j * 64, 0);
      graphics.lineTo(j * 64, 576);
    }
    graphics.strokePath();
  }

  placementAvailable(i: number, j: number): boolean {
    return this.towerMap[i][j] === 0;
  }
  fireBullet(bullet: Bullet, enemy: Enemy, speed = 600) {
    console.log('fire bullet from scene');
    this.physics.moveToObject(bullet, enemy, speed);
  }
}
