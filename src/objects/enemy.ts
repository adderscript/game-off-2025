import { GameObj, Vec2 } from 'kaplay';
import k from '../gameCtx';
import { pointInCircle } from '../utils/collision';

export function createEnemy(pos: Vec2): GameObj {
    const enemy = k.add([
        k.rect(16.0, 16.0),
        k.color("#ff0000"),
        k.pos(pos),
        k.anchor("bot"),
        k.area(),
        k.body({ drag: 12.5 }),

        {
            speed: 500.0,
            detectionRadius: 75.0,
        },
    ]);

    const playerDetectRad = enemy.add([
        
    ]);

    enemy.onUpdate(() => {
        const player = k.get("player")[0];
        const tower = k.get("radioTower")[0];
        
        // move towards tower if player is not in radius
        if (pointInCircle(player.pos, enemy.pos, enemy.detectionRadius)) {
            const dir = player.pos.sub(enemy.pos).unit();
            enemy.addForce(dir.scale(enemy.speed));
        } else {
            const dir = tower.pos.sub(enemy.pos).unit();
            enemy.addForce(dir.scale(enemy.speed));
        }
    });

    return enemy;
}