import { Character } from '@src/objects/character';

const INTERVAL = 120;

export class TurnManager {
  private characters: Set<Character>;
  private lastCall: number;

  constructor() {
    this.characters = new Set();
    this.lastCall = Date.now();
  }

  addCharacter(character: Character): void {
    this.characters.add(character);
  }

  removeCharacter(character: Character): void {
    this.characters.delete(character);
  }

  refresh(): void {
    this.characters.forEach(c => c.refresh());
  }

  turn(): void {
    const now = Date.now();
    const limit = this.lastCall + INTERVAL;
    if (now > limit) {
      for (const c of this.characters) {
        if (!c.over()) {
          c.turn();
          break;
        }
      }
      this.lastCall = Date.now();
    }
  }

  over(): boolean {
    return [...this.characters].every(c => c.over());
  }
}
