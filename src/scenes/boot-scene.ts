import { WorldScene } from './world-scene';

export class BootScene extends Phaser.Scene {
  public static KEY = 'BootScene';

  constructor() {
    super({ key: BootScene.KEY });
  }

  preload(): void {
    // load assets
    this.load.spritesheet('tiles', 'assets/tileset.png', {
      frameWidth: 16,
      frameHeight: 16,
      spacing: 1,
    });
  }

  create(): void {
    this.scene.start(WorldScene.KEY);
  }
}
