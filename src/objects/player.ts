import { FRAME } from '@src/data/tileset-meta';
import { Character } from '@src/objects/character';
import { Dungeon } from '@src/objects/dungeon';

export class Player extends Character {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private dungeon: Dungeon;
  private movementPoints: number;
  // private actionPoints: number;
  // private healthPoints: number;

  public name: string;

  constructor(cursors: Phaser.Types.Input.Keyboard.CursorKeys, dungeon: Dungeon, x: number, y: number, name: string) {
    super(x, y, FRAME.player);

    this.cursors = cursors;
    this.dungeon = dungeon;
    this.name = name;
    this.movementPoints = 1;
    // this.actionPoints = 1;
    // this.healthPoints = 15;

    this.dungeon.setPlayer(this);
  }

  refresh(): void {
    this.movementPoints = 1;
    // this.actionPoints = 1;
  }

  turn(): void {
    const oldX = this.x;
    const oldY = this.x;
    let newX = this.x;
    let newY = this.y;
    let moved = false;

    if (this.movementPoints > 0) {
      if (this.cursors.left.isDown) {
        newX -= 1;
        moved = true;
      } else if (this.cursors.right.isDown) {
        newX += 1;
        moved = true;
      } else if (this.cursors.up.isDown) {
        newY -= 1;
        moved = true;
      } else if (this.cursors.down.isDown) {
        newY += 1;
        moved = true;
      }

      if (moved) {
        this.movementPoints -= 1;
        if (!this.dungeon.isWalkable(newX, newY)) {
          newX = oldX;
          newY = oldY;
        }
        if (newX !== oldX || newY !== oldY) {
          this.dungeon.moveCharacterTo(this, newX, newY);
        }
      }
    }
  }

  over(): boolean {
    return this.movementPoints === 0 && !this.moving;
  }

  attack(): number {
    return 1;
  }

  onDestroy(): void {
    alert('You died');
    location.reload();
  }
}
