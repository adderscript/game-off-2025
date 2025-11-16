import { GameObj, Vec2 } from 'kaplay';
import * as rand from '../utils/random';
import k from '../gameCtx';
import { createEnemy } from './enemy';

export function createEnemyManager(): GameObj {
    const enemyManager = k.add([
        {
            spawnTimer: 0.0,
            spawnDelay: 2.0,
        
            spawnEnemy() {
                let spawnPos: Vec2 = k.vec2();

                const value = rand.rangeI(0, 3);

                switch (value) {
                    case 0: // left
                        spawnPos = k.vec2(0, rand.rangeI(0, k.height()));
                        break;

                    case 1: // right
                        spawnPos = k.vec2(k.width(), rand.rangeI(0, k.height()));
                        break;

                    case 2: // top
                        spawnPos = k.vec2(rand.rangeI(0, k.width()), 0);
                        break;

                    case 3: // bottom
                        spawnPos = k.vec2(rand.rangeI(0, k.width()), k.height());
                        break;
                }

                createEnemy(spawnPos);
            }
        },
    ]);

    enemyManager.onUpdate(() => {
        // spawn enemy
        enemyManager.spawnTimer += k.dt();
        if (enemyManager.spawnTimer >= enemyManager.spawnDelay) {
            enemyManager.spawnEnemy();
            enemyManager.spawnTimer = 0.0;
        }
    });

    return enemyManager;
}