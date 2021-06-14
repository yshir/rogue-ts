export class WorldScene extends Phaser.Scene {
  constructor() {
    super({ key: KEY_WORLD_SCENE });
  }

  preload(): void {
    console.log('world/preload');
  }

  create(): void {
    console.log('world/create');
  }
}

export const KEY_WORLD_SCENE = 'WorldScene';
