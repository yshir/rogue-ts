import { Character } from '@src/objects/character';

export class TurnManager {
  private readonly characters: Set<Character>;
  private currentIdx: number;

  constructor() {
    this.characters = new Set();
    this.currentIdx = 0;
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
