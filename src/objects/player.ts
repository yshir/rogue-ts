import { FRAME } from '@src/data/tileset-meta';
import { Character } from '@src/objects/character';
import { Dungeon } from '@src/objects/dungeon';

export class Player extends Character {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private dungeon: Dungeon;
  private movementPoints: number;

  constructor(cursors: Phaser.Types.Input.Keyboard.CursorKeys, dungeon: Dungeon, x: number, y: number) {
    super(x, y, FRAME.player);

    this.cursors = cursors;
    this.dungeon = dungeon;
    this.movementPoints = 1;

    this.dungeon.setCharacter(this);
  }

  refresh(): void {
    this.movementPoints = 1;
  }

  turn(): void {
    let newX = this.x;
    let newY = this.y;
    let moved = false;

    if (this.movementPoints > 0 && !this.moving) {
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
        if (this.dungeon.isWalkable(newX, newY)) {
          this.dungeon.moveCharacterTo(this, newX, newY);
        }
      }
    }
  }

  over(): boolean {
    return this.movementPoints === 0 && !this.moving;
  }
}
