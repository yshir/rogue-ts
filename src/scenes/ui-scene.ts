import { Dungeon } from '@src/dungeon';
import { TurnManager } from '@src/turn-manager';

export class UIScene extends Phaser.Scene {
  public static readonly KEY = 'UIScene';

  private log?: Phaser.GameObjects.Text;

  constructor() {
    super({ key: UIScene.KEY });
  }

  create(): void {
    const characters = TurnManager.instance.characters.values();
    const x = 80 * 16 - 190;
    let y = 10;
    for (const character of characters) {
      const height = character.createUI({ scene: this, x, y, width: 198 });
      y += height;
    }

    this.add.line(x + 5, y, 0, 10, 175, 10, 0xcfc6b8).setOrigin(0);
    this.log = this.add.text(x + 10, y + 20, '', {
      font: '12px Arial',
      color: '#cfc6b8',
      wordWrap: {
        width: 180,
      },
    });
  }

  update(): void {
    const text = Dungeon.instance.messages.join('\n\n');
    this.log!.setText(text);
  }
}
