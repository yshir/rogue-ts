import { Dungeon } from '@src/objects/dungeon';

export abstract class Character {
  protected readonly dungeon: Dungeon;

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

  // turn
  abstract refresh(): void;
  abstract over(): boolean;
  abstract turn(): void;

  // combat
  abstract attack(): number;

  // callback
  abstract onDestroy(): void;

  constructor({
    dungeon,
    x,
    y,
    frame,
    name,
    movementPoints,
    actionPoints,
    healthPoints,
  }: {
    dungeon: Dungeon;
    x: number;
    y: number;
    frame: number;
    name: string;
    movementPoints: number;
    actionPoints: number;
    healthPoints: number;
  }) {
    this.dungeon = dungeon;
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
