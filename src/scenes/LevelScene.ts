import Phaser from 'phaser';

export default class LevelScene extends Phaser.Scene {
  enemies?: Phaser.GameObjects.Group;
  path?: Phaser.Curves.Path;
  nextEnemy = 0;

  constructor(name: string) {
    super(name);
  }

  getPath(): Phaser.Curves.Path {
    const p = this.path != undefined ? this.path! : new Phaser.Curves.Path();
    return p;
  }
}
