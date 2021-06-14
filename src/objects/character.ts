export abstract class Character {
  public x: number;
  public y: number;
  public frame: number;
  public moving: boolean;
  public sprite?: Phaser.GameObjects.Sprite;

  abstract refresh(): void;
  abstract over(): boolean;
  abstract turn(): void;

  constructor(x: number, y: number, frame: number) {
    this.x = x;
    this.y = y;
    this.frame = frame;
    this.moving = false;
  }
}
