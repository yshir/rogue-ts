import { FRAME } from '@src/data/tileset-meta';
import { Dungeon } from '@src/dungeon';
import { Character } from '@src/objects/character';

export class Player extends Character {
  private readonly cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  public UIHeader?: Phaser.GameObjects.Text;
  public UIStatsText?: Phaser.GameObjects.Text;
  public UIItems: Phaser.GameObjects.Rectangle[];

  constructor(x: number, y: number, name: string) {
    super({
      x,
      y,
      name,
      frame: FRAME.player,
      movementPoints: 1,
      actionPoints: 1,
      healthPoints: 15,
    });

    this.cursors = Dungeon.instance.scene.input.keyboard.createCursorKeys();
    this.UIItems = [];
  }

  public refresh(): void {
    this.movementPoints = 1;
    // this.actionPoints = 1;
  }

  public turn(): void {
    const oldX = this.x;
    const oldY = this.x;
    let newX = this.x;
    let newY = this.y;
    let moved = false;

    if (this.movementPoints > 0) {
      if (this.cursors.left.isDown) {
        newX--;
        moved = true;
      }
      if (this.cursors.right.isDown) {
        newX++;
        moved = true;
      }
      if (this.cursors.up.isDown) {
        newY--;
        moved = true;
      }
      if (this.cursors.down.isDown) {
        newY++;
        moved = true;
      }

      if (moved) {
        this.movementPoints--;
        if (!Dungeon.instance.isWalkableTile(newX, newY)) {
          const enemy = Dungeon.instance.characterAtTile(newX, newY);
          if (enemy && this.actionPoints > 0) {
            Dungeon.instance.attackCharacter(this, enemy);
            this.actionPoints--;
          }
          newX = oldX;
          newY = oldY;
        }
        if (newX !== oldX || newY !== oldY) {
          Dungeon.instance.moveCharacterTo(this, newX, newY);
        }
      }

      if (this.healthPoints <= 6) {
        this.sprite!.tint = Phaser.Display.Color.GetColor(255, 0, 0);
      }
    }
  }

  public over(): boolean {
    const isOver = this.movementPoints === 0 && !this.moving;
    if (this.UIHeader) {
      this.UIHeader.setColor(isOver ? '#cfc6b8' : '#ffffff');
    }
    if (this.UIStatsText) {
      this.UIStatsText.setText(`HP: ${this.healthPoints}\nMP: ${this.movementPoints}\nAP: ${this.actionPoints}`);
    }
    return isOver;
  }

  public attack(): number {
    return 1;
  }

  public onDestroy(): void {
    alert('You died');
    location.reload();
  }

  public createUI(opts: { scene: Phaser.Scene; x: number; y: number; width: number }): number {
    const scene = opts.scene;
    const x = opts.x;
    const y = opts.y;

    let accumulatedHeight = 0;

    // character UI
    this.UISprite = scene.add.sprite(x, y, 'tiles', FRAME.player);
    this.UIHeader = scene.add.text(x + 20, y, this.name, { font: '16px Arial', color: '#cfc6b8' });
    this.UIStatsText = scene.add.text(
      x + 20,
      y + 20,
      `HP: ${this.healthPoints}\nMP: ${this.movementPoints}\nAP: ${this.actionPoints}`,
      { font: '12px Arial', color: '#cfc6b8' },
    );

    accumulatedHeight += this.UISprite.height + this.UIStatsText.height;

    // inventory screen
    const itemsPerRow = 5;
    const rows = 2;
    this.UIItems = [];
    for (let row = 1; row <= rows; row++) {
      for (let cell = 1; cell <= itemsPerRow; cell++) {
        const rx = x + 25 * cell;
        const ry = y + 50 + 25 * row;
        this.UIItems.push(scene.add.rectangle(rx, ry, 20, 20, 0xcfc6b8, 0.3).setOrigin(0));
      }
    }

    accumulatedHeight += 90;

    // Separator
    scene.add.line(x + 5, y + 120, 0, 10, 175, 10, 0xcfc6b8).setOrigin(0);

    return accumulatedHeight;
  }
}
