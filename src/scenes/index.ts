import { BootScene } from './boot-scene';
import { UIScene } from './ui-scene';
import { WorldScene } from './world-scene';

export const scenes: typeof Phaser.Scene[] = [BootScene, WorldScene, UIScene];
