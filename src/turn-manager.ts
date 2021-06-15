import { Character } from '@src/objects/character';

export class TurnManager {
  private static _instance?: TurnManager;

  private currentIdx: number;

  public readonly characters: Set<Character>;

  constructor() {
    this.characters = new Set();
    this.currentIdx = 0;
  }

  static get instance(): TurnManager {
    if (!this._instance) {
      this._instance = new TurnManager();
    }
    return this._instance;
  }

  addCharacter(character: Character): void {
    this.characters.add(character);
  }

  removeCharacter(character: Character): void {
    this.characters.delete(character);
  }

  refresh(): void {
    this.characters.forEach(c => c.refresh());
    this.currentIdx = 0;
  }

  turn(): void {
    if (this.characters.size > 0) {
      const characters = [...this.characters];
      const character = characters[this.currentIdx];
      if (!character) {
        throw new Error('character is undefined unexpectedly');
      }

      if (!character.over()) {
        character.turn();
      } else {
        this.currentIdx++;
      }
    }
  }

  over(): boolean {
    return [...this.characters].every(c => c.over());
  }
}
