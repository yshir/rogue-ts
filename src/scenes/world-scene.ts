import { room1 } from '@src/data/room1';
import { Player } from '@src/objects/player';
import { Tile } from '@src/objects/tile';
import { Wall } from '@src/objects/wall';
import { TurnManager } from '@src/turn-manager';

export class WorldScene extends Phaser.Scene {
  private turnManager: TurnManager;

  constructor() {
    super({ key: WorldScene.key });
    this.turnManager = new TurnManager();
  }

  static get key(): string {
    return 'WorldScene';
  }

  preload(): void {
    //
  }

  create(): void {
    // convert the walls and floors
    const room = room1.map(row => row.map(col => (col === 1 ? Wall.sprite : Tile.sprite)));

    // render the tilemap
    const tileSize = 16;
    const map = this.make.tilemap({
      data: room,
      tileWidth: tileSize,
      tileHeight: tileSize,
    });
    const tileset = map.addTilesetImage('tiles', 'tiles', tileSize, tileSize, 0, 1);
    map.createLayer(0, tileset, 0, 0);

    // create the player
    const player = new Player(map, 15, 15);
    this.turnManager.addCharacter(player);
  }

  update(): void {
    if (this.turnManager.over()) {
      this.turnManager.refresh();
    }
    this.turnManager.turn();
  }
}
