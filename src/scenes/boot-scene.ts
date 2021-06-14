import { KEY_WORLD_SCENE } from './world-scene';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: KEY_BOOT_SCENE });
  }

  preload(): void {
    console.log('boot/preload');
  }

  create(): void {
    console.log('boot/create');
    this.scene.start(KEY_WORLD_SCENE);
  }
}

export const KEY_BOOT_SCENE = 'BootScene';
