import PF, { DiagonalMovement } from 'pathfinding';

import { FLOOR1 } from '@src/data/floor1';
import { TILE_SIZE } from '@src/data/tileset-meta';
import { Character } from '@src/objects/character';
import { Floor } from '@src/objects/floor';
import { Monster } from '@src/objects/monster';
import { Player } from '@src/objects/player';
import { TurnManager } from '@src/turn-manager';

export class Dungeon {
  private static _instance?: Dungeon;

  public readonly scene: Phaser.Scene;
  public readonly tilemapLayer: Phaser.Tilemaps.TilemapLayer;
  public readonly player: Player;
  public readonly floor: Floor;
  public readonly messages: string[];

  private constructor(scene: Phaser.Scene) {
    Dungeon._instance = this;
    this.scene = scene;
    this.floor = new Floor(FLOOR1);
    this.tilemapLayer = this.createTilemapLayer();
    this.player = this.createPlayer(15, 15, 'Player');
    this.messages = [];
  }

  public static get instance(): Dungeon {
    if (!this._instance) {
      throw new Error('Dungeon not initialized');
    }
    return this._instance;
  }

  public static initialize(scene: Phaser.Scene): void {
    if (this._instance) {
      throw new Error('Dungeon already initialized');
    }
    new Dungeon(scene);
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
    const player = new Player(x, y, name);
    this.setCharacter(player);
    return player;
  }

  public createMonster(x: number, y: number, name: string): Monster {
    const monster = new Monster(x, y, name);
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
    TurnManager.instance.addCharacter(character);
  }

  public removeCharacter(character: Character): void {
    TurnManager.instance.characters.delete(character);
    character.sprite?.destroy();
    character.onDestroy();
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

  public isWalkableTile(x: number, y: number): boolean {
    // check character
    for (const c of TurnManager.instance.characters) {
      if (c.x === x && c.y === y) {
        return false;
      }
    }
    // check tile
    return this.floor.isWalkableTile(x, y);
  }

  public characterAtTile(x: number, y: number): Character | null {
    const characters = [...TurnManager.instance.characters];
    for (const c of characters) {
      if (c.x === x && c.y === y) {
        return c;
      }
    }
    return null;
  }

  public distanceBetweenCharacters(c1: Character, c2: Character): number {
    const grid = new PF.Grid(this.floor.toPathfindingMatrix());
    const finder = new PF.AStarFinder({ diagonalMovement: DiagonalMovement.Always });
    const path = finder.findPath(c1.x, c1.y, c2.x, c2.y, grid);
    if (path.length >= 2) {
      return path.length;
    }
    throw new Error('pathfinding error');
  }

  public attackCharacter(attacker: Character, victim: Character): void {
    attacker.moving = true;
    attacker.tweens++;

    this.scene.tweens.add({
      targets: attacker.sprite,
      onComplete: () => {
        attacker.sprite!.x = this.tilemapLayer.tileToWorldX(attacker.x);
        attacker.sprite!.y = this.tilemapLayer.tileToWorldY(attacker.y);
        attacker.moving = false;
        attacker.tweens -= 1;

        const damage = attacker.attack();
        victim.healthPoints -= damage;
        this.log(`${attacker.name} does ${damage} damage to ${victim.name}`);
        if (victim.healthPoints <= 0) {
          this.removeCharacter(victim);
        }
      },
      x: this.tilemapLayer.tileToWorldX(victim.x),
      y: this.tilemapLayer.tileToWorldY(victim.y),
      ease: 'Power2',
      hold: 20,
      duration: 80,
      delay: attacker.tweens * 200,
      yoyo: true,
    });
  }

  public log(text: string): void {
    this.messages.unshift(text);
    this.messages.slice(0, 8);
  }
}
