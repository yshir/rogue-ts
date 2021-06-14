import { WorldScene } from './world-scene';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: BootScene.key });
  }

  static get key(): string {
    return 'BootScene';
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
    this.scene.start(WorldScene.key);
  }
}
