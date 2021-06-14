import 'phaser';

import { scenes } from './scenes';

const isDebugMode = /debug/.test(location.hash);

const config: Phaser.Types.Core.GameConfig = {
  title: 'rogue-ts',
  version: '0.0.1',
  type: Phaser.AUTO,
  parent: 'game',
  width: 800,
  height: 600,
  backgroundColor: '#000',
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: isDebugMode,
    },
  },
  scene: scenes,
};

window.addEventListener('load', () => {
  new Phaser.Game(config);
});
