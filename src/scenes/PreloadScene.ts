import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }
  preload(): void {
    this.load.atlas(
      'sprites',
      'assets/spritesheet.png',
      'assets/spritesheet.json'
    );
    this.load.image('bullet', 'assets/bullet.png');
  }
  create(): void {
    this.scene.start('level01');
  }
}
