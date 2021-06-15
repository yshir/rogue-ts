import { FRAME } from '@src/data/tileset-meta';

export class Floor {
  public static readonly FLOOR_WALL = 1;
  public static readonly FLOOR_TILE = 0;

  private readonly data: number[][];

  constructor(data: number[][]) {
    this.data = data;
  }

  public isWall(x: number, y: number): boolean {
    return this.data[y]?.[x] === Floor.FLOOR_WALL;
  }

  public isTile(x: number, y: number): boolean {
    return this.data[y]?.[x] === Floor.FLOOR_TILE;
  }

  public isWalkableTile(x: number, y: number): boolean {
    return !this.isWall(x, y);
  }

  public toTilemapData(): number[][] {
    return this.data.map(row => row.map(col => (col === Floor.FLOOR_TILE ? FRAME.floor : FRAME.wall)));
  }

  public toPathfindingMatrix(): number[][] {
    // walkability matrix. 0 is walkable, 1 is not
    return this.data.map(row => row.map(col => (col === Floor.FLOOR_TILE ? 0 : 1)));
  }
}
