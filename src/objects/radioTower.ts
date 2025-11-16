import { GameObj, Vec2 } from 'kaplay';
import k from '../gameCtx';

export function createRadioTower(): GameObj {
    const radioTower = k.add([
        "radioTower",
        k.sprite("radiotower"),
        k.pos(k.center()),
        k.z(0.0),
        k.anchor("bot"),
        k.area({ scale: k.vec2(0.9, 0.05) }),
        k.body({ isStatic: true }),
        k.health(10.0, 10.0),

        {
            takeDamage(damage: number) {
                radioTower.hurt(damage);

                const max = radioTower.maxHP() ?? 1.0;
                healthbar.width = radioTower.hp() / max * healthbar.baseWidth;
            },
        },
    ]);
    
    radioTower.z = radioTower.pos.y;

    // health bar
    const healthbar = radioTower.add([
        k.rect(32.0, 4.0),
        k.color("#900e0e"),
        k.pos(-16.0, -65.0),
        k.anchor("left"),

        {
            baseWidth: 32.0,
        }
    ]);

    return radioTower;
}