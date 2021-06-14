import { Dungeon } from '@src/objects/dungeon';
import { Player } from '@src/objects/player';
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
    const dungeon = new Dungeon(this);

    const cursors = this.input.keyboard.createCursorKeys();
    const player = new Player(cursors, dungeon, 15, 15);
    // const player2 = new Player(cursors, dungeon, 18, 18);

    this.turnManager.addCharacter(player);
    // this.turnManager.addCharacter(player2);
  }

  update(): void {
    if (this.turnManager.over()) {
      this.turnManager.refresh();
    }
    this.turnManager.turn();
  }
}
