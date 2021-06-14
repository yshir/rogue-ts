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
    // define the map (0: floor, 1: wall)
    const dungeon = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    // asset index
    const wall = 554;
    const floor = 0;

    // the size of a tile in pixel
    const tileSize = 16;

    // make tilemap
    const map = this.make.tilemap({
      data: dungeon.map(row => {
        return row.map(col => {
          return col === 1 ? wall : floor;
        });
      }),
      tileWidth: tileSize,
      tileHeight: tileSize,
    });
    const tileset = map.addTilesetImage('tiles', 'tiles', tileSize, tileSize, 0, 1);

    // render tilemap layer
    map.createLayer(0, tileset, 0, 0);
  }
}
