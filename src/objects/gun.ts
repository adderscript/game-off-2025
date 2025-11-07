import { GameObj } from 'kaplay';
import k from '../gameCtx';
import createBullet from './bullet';

export function createGun(): GameObj {
    const gun = k.make([
        "gun",
        k.sprite("gun", { anim: "idle", animSpeed: 1.5, }),
        k.pos(),
        k.rotate(),
        k.anchor("left"),

        {
            offset: k.vec2(0.0, -10.35),
            distance: -5.0,
            firepointY: 1.5,

            shootDelay: 0.5,
            shootTimer: 0.0,
            shootForce: 200.0,
        },
    ]);

    // set fire point
    const firepoint = gun.add([
        k.pos(20.0, gun.firepointY),
    ]);

    gun.onUpdate(() => {
        // rotate towards mouse
        const diff = k.mousePos().sub(gun.worldPos());
        gun.rotateTo(diff.angle());

        // move away from player
        const dir = k.vec2(Math.cos(k.deg2rad(gun.angle)), Math.sin(k.deg2rad(gun.angle)));
        gun.pos = gun.offset.add(dir.scale(gun.distance));

        // flip if facing left
        gun.flipY = k.mousePos().x < k.get("player")[0].worldPos().x;
        firepoint.pos.y = gun.flipY ? gun.firepointY : -gun.firepointY;

        // update shoot timer
        gun.shootTimer += k.dt();
    });

    gun.onMouseDown("left", () => {
        if (gun.shootTimer < gun.shootDelay) return;
        gun.shootTimer = 0.0;

        const bullet = createBullet(firepoint.worldPos(), gun.angle);

        // shoot bullet in mouse direction
        const dir = k.vec2(Math.cos(k.deg2rad(gun.angle)), Math.sin(k.deg2rad(gun.angle)));
        bullet.applyImpulse(dir.scale(gun.shootForce));

        // play shoot animation
        gun.play("shoot", { loop: false, });
    });

    return gun;
}