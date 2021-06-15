export abstract class Character {
  public x: number;
  public y: number;
  public frame: number;
  public name: string;
  public movementPoints: number;
  public actionPoints: number;
  public healthPoints: number;
  public moving: boolean;
  public tweens: number;
  public sprite?: Phaser.GameObjects.Sprite;

  public UISprite?: Phaser.GameObjects.Sprite;

  // UI
  abstract createUI(opts: { scene: Phaser.Scene; x: number; y: number; width: number }): number;

  // turn
  abstract refresh(): void;
  abstract over(): boolean;
  abstract turn(): void;

  // combat
  abstract attack(): number;

  // callback
  abstract onDestroy(): void;

  constructor({
    x,
    y,
    frame,
    name,
    movementPoints,
    actionPoints,
    healthPoints,
  }: {
    x: number;
    y: number;
    frame: number;
    name: string;
    movementPoints: number;
    actionPoints: number;
    healthPoints: number;
  }) {
    this.x = x;
    this.y = y;
    this.frame = frame;
    this.name = name;
    this.movementPoints = movementPoints;
    this.actionPoints = actionPoints;
    this.healthPoints = healthPoints;
    this.moving = false;
    this.tweens = 0;
  }
}
