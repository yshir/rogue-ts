import { Dungeon } from '@src/objects/dungeon';
import { TurnManager } from '@src/turn-manager';

export class WorldScene extends Phaser.Scene {
  public static KEY = 'WorldScene';

  private turnManager: TurnManager;

  constructor() {
    super({ key: WorldScene.KEY });
    this.turnManager = new TurnManager();
  }

  preload(): void {
    //
  }

  create(): void {
    const dungeon = new Dungeon(this, this.turnManager);
    dungeon.createMonster(70, 8, 'Skelton');
    dungeon.createMonster(30, 8, 'Skelton');
  }

  update(): void {
    if (this.turnManager.over()) {
      this.turnManager.refresh();
    }
    this.turnManager.turn();
  }
}
