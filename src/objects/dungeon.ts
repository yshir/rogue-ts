import { FLOOR1 } from '@src/data/floor1';
import { TILE_SIZE } from '@src/data/tileset-meta';
import { Floor } from '@src/objects/floor';
import { TurnManager } from '@src/turn-manager';

import { Character } from './character';
import { Monster } from './monster';
import { Player } from './player';

export class Dungeon {
  public readonly scene: Phaser.Scene;
  public readonly tilemapLayer: Phaser.Tilemaps.TilemapLayer;
  public readonly turnManager: TurnManager;
  public readonly player: Player;
  public readonly floor: Floor;

  constructor(scene: Phaser.Scene, turnManager: TurnManager) {
    this.scene = scene;
    this.floor = new Floor(FLOOR1);
    this.turnManager = turnManager;

    this.tilemapLayer = this.createTilemapLayer();
    this.player = this.createPlayer(15, 15, 'Player');
  }

  public createTilemapLayer(): Phaser.Tilemaps.TilemapLayer {
    const map = this.scene.make.tilemap({
      data: this.floor.toTilemapData(),
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE,
    });
    const tileset = map.addTilesetImage('tiles', 'tiles', TILE_SIZE, TILE_SIZE, 0, 1);
    return map.createLayer(0, tileset, 0, 0);
  }

  public createPlayer(x: number, y: number, name: string): Player {
    const player = new Player(this, x, y, name);
    this.setCharacter(player);
    return player;
  }

  public createMonster(x: number, y: number, name: string): Monster {
    const monster = new Monster(this, x, y, name);
    this.setCharacter(monster);
    return monster;
  }

  public setCharacter(character: Character): void {
    // register to tilemap
    const x = this.tilemapLayer.tileToWorldX(character.x);
    const y = this.tilemapLayer.tileToWorldY(character.y);
    character.sprite = this.scene.add.sprite(x, y, 'tiles', character.frame);
    character.sprite.setOrigin(0);

    // register to turn manager
    this.turnManager.addCharacter(character);
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
      duration: 100,
    });
  }

  public isWalkable(x: number, y: number): boolean {
    return this.floor.isWalkable(x, y);
  }
}
