import { FLOOR1 } from '@src/data/floor1';
import { TILE_SIZE } from '@src/data/tileset-meta';
import { Floor } from '@src/objects/floor';

import { Character } from './character';
import { Player } from './player';

export class Dungeon {
  private scene: Phaser.Scene;
  private tilemapLayer: Phaser.Tilemaps.TilemapLayer;
  private _player?: Player;

  public floor: Floor;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.floor = new Floor(FLOOR1);

    const map = this.scene.make.tilemap({
      data: this.floor.toTilemapData(),
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE,
    });
    const tileset = map.addTilesetImage('tiles', 'tiles', TILE_SIZE, TILE_SIZE, 0, 1);
    this.tilemapLayer = map.createLayer(0, tileset, 0, 0);
  }

  public isWalkable(x: number, y: number): boolean {
    return this.floor.isWalkable(x, y);
  }

  public get player(): Player {
    if (typeof this._player === 'undefined') {
      throw new Error('player is not initialized yet');
    }
    return this._player;
  }

  public setPlayer(player: Player): void {
    this._player = player;
    this.setCharacter(player);
  }

  public setCharacter(character: Character): void {
    const x = this.tilemapLayer.tileToWorldX(character.x);
    const y = this.tilemapLayer.tileToWorldY(character.y);
    character.sprite = this.scene.add.sprite(x, y, 'tiles', character.frame);
    character.sprite.setOrigin(0);
  }

  public moveCharacterTo(character: Character, x: number, y: number): void {
    character.moving = true;
    this.scene.tweens.add({
      targets: character.sprite,
      onComplete: () => {
        character.moving = false;
        character.x = x;
        character.y = y;
      },
      x: this.tilemapLayer.tileToWorldX(x),
      y: this.tilemapLayer.tileToWorldY(y),
      ease: 'Power2',
      duration: 200,
    });
  }
}
