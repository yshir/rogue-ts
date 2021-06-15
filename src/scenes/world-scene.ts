import { Dungeon } from '@src/dungeon';
import { TurnManager } from '@src/turn-manager';

import { UIScene } from './ui-scene';

export class WorldScene extends Phaser.Scene {
  public static readonly KEY = 'WorldScene';

  constructor() {
    super({ key: WorldScene.KEY });
  }

  preload(): void {
    //
  }

  create(): void {
    Dungeon.initialize(this);

    // place monsters
    Dungeon.instance.createMonster(20, 20, 'Skelton');
    Dungeon.instance.createMonster(20, 10, 'Skelton');
    Dungeon.instance.createMonster(76, 10, 'Skelton');
    Dungeon.instance.createMonster(29, 24, 'Skelton');
    Dungeon.instance.createMonster(29, 20, 'Skelton');

    // set camera
    // to shrink on the right side freeing space for the UI scene
    const camera = this.cameras.main;
    // camera.setViewport(0, 0, camera.worldView.width - 200, camera.worldView.height);
    // camera.setBounds(0, 0, camera.worldView.width, camera.worldView.height);
    camera.setViewport(0, 0, 80 * 16 - 200, 50 * 16);
    camera.setBounds(0, 0, 80 * 16, 50 * 16);
    camera.startFollow(Dungeon.instance.player.sprite!);

    // trigger UI scene construction
    this.scene.run(UIScene.KEY);
  }

  update(): void {
    if (TurnManager.instance.over()) {
      TurnManager.instance.refresh();
    }
    TurnManager.instance.turn();
  }
}
