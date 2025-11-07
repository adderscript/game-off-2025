import k from './gameCtx';
import { createGameScene } from './scenes/game';

k.loadRoot("./");
k.loadAseprite("player", "sprites/player/player.png", "sprites/player/player.json");
k.loadAseprite("gun", "sprites/gun/gun.png", "sprites/gun/gun.json");
k.loadSprite("radiotower", "sprites/radiotower.png");

createGameScene();
k.go("game");

