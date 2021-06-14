import { FRAME } from '@src/data/tileset-meta';

export class Floor {
  public static FLOOR_WALL = 1;
  public static FLOOR_TILE = 0;

  private data: number[][];

  constructor(data: number[][]) {
    this.data = data;
  }

  public isWall(x: number, y: number): boolean {
    return this.data[y]?.[x] === Floor.FLOOR_WALL;
  }

  public isTile(x: number, y: number): boolean {
    return this.data[y]?.[x] === Floor.FLOOR_TILE;
  }

  public isWalkable(x: number, y: number): boolean {
    return !this.isWall(x, y);
  }

  public toTilemapData(): number[][] {
    return this.data.map(row => row.map(col => (col === Floor.FLOOR_TILE ? FRAME.tile : FRAME.wall)));
  }
}
