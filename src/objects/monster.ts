import PF from 'pathfinding';

import { FRAME } from '@src/data/tileset-meta';
import { Character } from '@src/objects/character';

import { Dungeon } from './dungeon';

export class Monster extends Character {
  private dungeon: Dungeon;
  private movementPoints: number;
  private actionPoints: number;
  // private healthPoints: number;

  public name: string;

  constructor(dungeon: Dungeon, x: number, y: number, name: string) {
    super(x, y, FRAME.monster);
    this.dungeon = dungeon;
    this.name = name;
    this.movementPoints = 1;
    this.actionPoints = 1;
    // this.healthPoints = 1;

    this.dungeon.setCharacter(this);
  }

  public refresh(): void {
    this.movementPoints = 1;
    this.actionPoints = 1;
  }

  public turn(): void {
    const oldX = this.x;
    const oldY = this.y;

    if (this.movementPoints > 0) {
      const px = this.dungeon.player.x;
      const py = this.dungeon.player.y;
      const grid = new PF.Grid(this.dungeon.floor.toPathfindingMatrix());
      const finder = new PF.AStarFinder();
      const path = finder.findPath(oldX, oldY, px, py, grid);

      if (path.length > 2) {
        const x = path[1]?.[0] as number;
        const y = path[1]?.[1] as number;
        this.dungeon.moveCharacterTo(this, x, y);
      }

      this.movementPoints -= 1;
    }

    if (this.actionPoints > 0) {
      // do something
      this.actionPoints -= 1;
    }
  }

  public over(): boolean {
    return this.movementPoints === 0 && this.actionPoints === 0 && !this.moving;
  }

  public attack(): number {
    return 1;
  }

  public onDestroy(): void {
    console.log(`${this.name} was killed`);
  }
}
