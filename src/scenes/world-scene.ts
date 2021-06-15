import { Dungeon } from '@src/objects/dungeon';

export class WorldScene extends Phaser.Scene {
  public static KEY = 'WorldScene';

  private _dungeon?: Dungeon;

  constructor() {
    super({ key: WorldScene.KEY });
  }

  preload(): void {
    //
  }

  create(): void {
    this._dungeon = new Dungeon(this);
    this._dungeon.createMonster(70, 8, 'Skelton');
    this._dungeon.createMonster(30, 8, 'Skelton');
  }

  update(): void {
    if (this.dungeon.turnManager.over()) {
      this.dungeon.turnManager.refresh();
    }
    this.dungeon.turnManager.turn();
  }

  public get dungeon(): Dungeon {
    if (!this._dungeon) throw new Error('dungeon not initialized');
    return this._dungeon;
  }
}
