import PF from 'pathfinding';

import { FRAME } from '@src/data/tileset-meta';
import { Dungeon } from '@src/dungeon';
import { Character } from '@src/objects/character';

export class Monster extends Character {
  public UIText?: Phaser.GameObjects.Text;

  constructor(x: number, y: number, name: string) {
    super({
      x,
      y,
      name,
      frame: FRAME.monster,
      movementPoints: 1,
      actionPoints: 1,
      healthPoints: 1,
    });
  }

  public refresh(): void {
    this.movementPoints = 1;
    this.actionPoints = 1;
  }

  public turn(): void {
    const oldX = this.x;
    const oldY = this.y;

    if (this.movementPoints > 0) {
      const px = Dungeon.instance.player.x;
      const py = Dungeon.instance.player.y;
      const grid = new PF.Grid(Dungeon.instance.floor.toPathfindingMatrix());
      const finder = new PF.AStarFinder();
      const path = finder.findPath(oldX, oldY, px, py, grid);

      if (path.length > 2) {
        const x = path[1]?.[0] as number;
        const y = path[1]?.[1] as number;
        Dungeon.instance.moveCharacterTo(this, x, y);
      }

      this.movementPoints--;
    }

    if (this.actionPoints > 0) {
      if (Dungeon.instance.distanceBetweenCharacters(this, Dungeon.instance.player) <= 2) {
        Dungeon.instance.attackCharacter(this, Dungeon.instance.player);
      }
      this.actionPoints--;
    }
  }

  public over(): boolean {
    const isOver = this.movementPoints === 0 && this.actionPoints === 0 && !this.moving;
    if (this.UIText) {
      this.UIText.setColor(isOver ? '#cfc6b8' : '#ffffff');
    }
    return isOver;
  }

  public attack(): number {
    return 1;
  }

  public onDestroy(): void {
    Dungeon.instance.log(`${this.name} was killed`);
    this.UISprite!.setAlpha(0.2);
    this.UIText!.setAlpha(0.2);
  }

  public createUI(opts: { scene: Phaser.Scene; x: number; y: number; width: number }): number {
    const scene = opts.scene;
    const x = opts.x;
    const y = opts.y;

    this.UISprite = scene.add.sprite(x, y, 'tiles', FRAME.monster).setOrigin(0);
    this.UIText = scene.add.text(x + 20, y, this.name, { font: '16px Arial', color: '#cfc6b8' });

    return 30;
  }
}
