import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }
  preload(): void {
    // this.load.atlas(
    //   'sprites',
    //   'assets/tower-defense-spritesheet.png',
    //   'assets/tower-defense-spritesheet.json'
    // );
    this.load.image('enemy', 'assets/enemy64.png');
    this.load.image('tower', 'assets/tower64.png');
    this.load.image('bullet', 'assets/bullet.png');
  }
  create(): void {
    this.scene.start('levelscene');
  }
}
