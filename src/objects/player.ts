import { FRAME } from '@src/data/tileset-meta';
import { Character } from '@src/objects/character';
import { Dungeon } from '@src/objects/dungeon';

export class Player extends Character {
  private readonly cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(dungeon: Dungeon, x: number, y: number, name: string) {
    super({
      dungeon,
      x,
      y,
      name,
      frame: FRAME.player,
      movementPoints: 1,
      actionPoints: 1,
      healthPoints: 15,
    });

    this.cursors = this.dungeon.scene.input.keyboard.createCursorKeys();
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
        if (!this.dungeon.isWalkableTile(newX, newY)) {
          const enemy = this.dungeon.characterAtTile(newX, newY);
          if (enemy && this.actionPoints > 0) {
            this.dungeon.attackCharacter(this, enemy);
            this.actionPoints--;
          }
          newX = oldX;
          newY = oldY;
        }
        if (newX !== oldX || newY !== oldY) {
          this.dungeon.moveCharacterTo(this, newX, newY);
        }
      }

      if (this.healthPoints <= 6) {
        this.sprite!.tint = Phaser.Display.Color.GetColor(255, 0, 0);
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
