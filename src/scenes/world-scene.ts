import { room1 } from '@src/data/room1';

export class WorldScene extends Phaser.Scene {
  constructor() {
    super({ key: WorldScene.key });
  }

  static get key(): string {
    return 'WorldScene';
  }

  preload(): void {
    console.log('world/preload');
  }

  create(): void {
    console.log('world/create');
    this.renderTilemap();
  }

  private renderTilemap(): void {
    // convert the walls and floors
    const wall = 554;
    const floor = 0;
    const room = room1.map(row => row.map(col => (col === 1 ? wall : floor)));

    // render the tilemap
    const tileSize = 16;
    const map = this.make.tilemap({
      data: room,
      tileWidth: tileSize,
      tileHeight: tileSize,
    });
    const tileset = map.addTilesetImage('tiles', 'tiles', tileSize, tileSize, 0, 1);
    map.createLayer(0, tileset, 0, 0);
  }
}
