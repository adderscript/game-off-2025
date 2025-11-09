import k from '../gameCtx';
import { createRadioTower } from '../objects/radioTower';
import { createPlayer } from '../objects/player'
import { createGun } from '../objects/gun';
import { createEnemy } from '../objects/enemy';

export function createGameScene() {
    k.scene("game", () => {
        const radioTower = createRadioTower();
        const player = createPlayer();

        const enemy = createEnemy(k.vec2(100.0, 100.0));
    });
}