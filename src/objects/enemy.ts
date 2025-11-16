import { GameObj, Vec2, Collision } from 'kaplay';
import k from '../gameCtx';
import { pointInCircle } from '../utils/collision';

export function createEnemy(pos: Vec2): GameObj {
    const enemy = k.add([
        "enemy",
        k.rect(16.0, 16.0),
        k.color("#ff0000"),
        k.pos(pos),
        k.anchor("bot"),
        k.area(),
        k.body({ drag: 12.5 }),
        k.health(3.0),

        {
            speed: 500.0,

            detectionRadius: 100.0,
            damage: 1.0,
            knockbackForce: 750.0,
            
            towerAttackTimer: 0.0,
            towerAttackDelay: 1.0,
            
            takeDamage(damage: number, knockbackForce: number, damagerPosition: Vec2) {
                enemy.hurt(damage);

                // apply knockback
                const dir = enemy.pos.sub(damagerPosition).unit();
                enemy.applyImpulse(dir.scale(knockbackForce));
            },
        },
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

        // handle y-sort
        player.z = player.pos.y;
    });

    enemy.onCollide("player", (other: GameObj) => {
        other.takeDamage(enemy.damage, enemy.knockbackForce, enemy.pos);
    });

    // radio tower attack handling
    enemy.onCollide("radioTower", () => enemy.towerAttackTimer = 0.0);

    enemy.onCollideUpdate("radioTower", (other: GameObj, collision: Collision) => {
        enemy.towerAttackTimer += k.dt();
        if (enemy.towerAttackTimer >= enemy.towerAttackDelay) {
            other.takeDamage(enemy.damage);
            enemy.towerAttackTimer = 0.0;
        }
    });

    enemy.on("death", () => {
        enemy.destroy();
    });

    return enemy;
}