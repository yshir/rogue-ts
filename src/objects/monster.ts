import PF from 'pathfinding';

import { FRAME } from '@src/data/tileset-meta';
import { Character } from '@src/objects/character';

import { Dungeon } from './dungeon';

export class Monster extends Character {
  private dungeon: Dungeon;
  private movementPoints: number;

  constructor(dungeon: Dungeon, x: number, y: number) {
    super(x, y, FRAME.monster);
    this.dungeon = dungeon;
    this.movementPoints = 1;

    this.dungeon.setCharacter(this);
  }

  public refresh(): void {
    this.movementPoints = 1;
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
  }

  public over(): boolean {
    return this.movementPoints === 0 && !this.moving;
  }
}
