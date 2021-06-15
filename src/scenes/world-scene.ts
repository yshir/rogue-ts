import { Dungeon } from '@src/objects/dungeon';
import { Monster } from '@src/objects/monster';
import { Player } from '@src/objects/player';
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
    const cursors = this.input.keyboard.createCursorKeys();

    const dungeon = new Dungeon(this);
    const player = new Player(cursors, dungeon, 15, 15, 'Player');
    const monster = new Monster(dungeon, 70, 8, 'Skelton');

    this.turnManager.addCharacter(player);
    this.turnManager.addCharacter(monster);
  }

  update(): void {
    if (this.turnManager.over()) {
      this.turnManager.refresh();
    }
    this.turnManager.turn();
  }
}
