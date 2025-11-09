import { GameObj, Vec2 } from 'kaplay';
import k from '../gameCtx';

export function createRadioTower(): GameObj {
    const radioTower = k.add([
        "radioTower",
        k.sprite("radiotower"),
        k.pos(k.center()),
        k.z(0.0),
        k.anchor("bot"),
        k.area({ scale: k.vec2(1.0, 0.05) }),
        k.body({ isStatic: true })
    ]);

    radioTower.z = radioTower.pos.y;

    return radioTower;
}