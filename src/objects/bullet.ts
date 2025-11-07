import { GameObj, Vec2 } from 'kaplay';
import k from '../gameCtx';

export default function createBullet(position: Vec2, angle: number): GameObj {
    const bullet = k.add([
        "bullet",
        k.circle(2.5),
        k.pos(position),
        k.scale(),
        k.rotate(angle),
        k.anchor("center"),
        k.area(),
        k.body(),
        k.offscreen({ destroy: true }),
    ]);

    bullet.onUpdate(() => {
        bullet.scale.x += 0.05;
        bullet.scale.y += 0.05;
    });

    return bullet;
}