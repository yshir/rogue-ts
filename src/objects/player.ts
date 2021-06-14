import { Character } from '@src/objects/character';
import { Wall } from '@src/objects/wall';

const CAN_DIG = true;

export class Player extends Character {
  private map: Phaser.Tilemaps.Tilemap;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private movementPoints: number;
  private x: number;
  private y: number;

  constructor(map: Phaser.Tilemaps.Tilemap, x: number, y: number) {
    super();

    this.map = map;
    this.cursors = map.scene.input.keyboard.createCursorKeys();
    this.movementPoints = 1;
    this.x = x;
    this.y = y;
  }

  static get sprite(): number {
    return 29;
  }

  canDig(): boolean {
    return CAN_DIG;
  }

  move(dx: number, dy: number): void {
    this.x += dx;
    this.y += dy;
  }

  refresh(): void {
    this.movementPoints = 1;
  }

  turn(): void {
    const x = this.x;
    const y = this.y;
    let moved = true;

    if (this.movementPoints > 0) {
      if (this.cursors.left.isDown) {
        this.move(-1, 0);
        moved = true;
      } else if (this.cursors.right.isDown) {
        this.move(1, 0);
        moved = true;
      } else if (this.cursors.up.isDown) {
        this.move(0, -1);
        moved = true;
      } else if (this.cursors.down.isDown) {
        this.move(0, 1);
        moved = true;
      }

      if (moved) {
        this.movementPoints -= 1;
      }
    }

    const destination = this.map.getTileAt(this.x, this.y);
    if (destination.index === Wall.sprite) {
      if (!this.canDig()) {
        this.x = x;
        this.y = y;
      }
    }

    // tile movement code
    if (this.x !== x || this.y !== y) {
      this.map.putTileAt(Player.sprite, this.x, this.y);
      this.map.putTileAt(0, x, y);
    }
  }

  over(): boolean {
    return this.movementPoints === 0;
  }
}
