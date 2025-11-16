import k from '../gameCtx';
import { createRadioTower } from '../objects/radioTower';
import { createPlayer } from '../objects/player'
import { createGun } from '../objects/gun';
import { createEnemyManager } from '../objects/enemyManager';

export function createGameScene() {
    k.scene("game", () => {
        const radioTower = createRadioTower();
        const player = createPlayer();
        const enemyManager = createEnemyManager();
    });
}