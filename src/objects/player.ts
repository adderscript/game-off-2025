import { GameObj, Vec2 } from 'kaplay';
import k from '../gameCtx';
import { createGun } from './gun';

export function createPlayer(): GameObj {
    const player = k.add([
        "player",
        k.sprite("player", { anim: "idle", animSpeed: 0.75, }),
        k.pos(k.center()),
        k.z(0.0),
        k.anchor(k.vec2(0.0, 0.6)),
        k.area({ scale: k.vec2(0.6, 0.2), offset: k.vec2(0.0, -0.0), }),
        k.body({ drag: 12.5 }),
        k.health(3.0),
        
        {
            speed: 50000.0,

            invincibilityDelay: 0.5,
            invincibilityTimer: 0.0,

            takeDamage(damage: number, knockbackForce: number, damagerPosition: Vec2) {
                if (player.invincibilityTimer < player.invincibilityDelay) {
                    return;
                }

                player.hurt(damage);

                // apply knockback
                const dir = player.pos.sub(damagerPosition).unit();
                player.applyImpulse(dir.scale(knockbackForce));
                k.shake(2.0);

                // start invincibility
                player.invincibilityTimer = 0.0;
            },
        },
    ]);

    player.onUpdate(() => {
        const isMoving = player.vel.len() > 50;
        const currentAnim = player.getCurAnim()?.name; 

        // handle animation
        if (isMoving && currentAnim !== "run") {
            player.play("run");
        } else if (!isMoving && currentAnim !== "idle") {
            player.play("idle");
        }
        player.flipX = k.mousePos().x < player.pos.x

        // update invincibility timer
        if (player.invincibilityTimer < player.invincibilityDelay) {
            player.invincibilityTimer += k.dt();
        }

        // handle y-sort
        player.z = player.pos.y;
    });

    player.onKeyDown("d", () => {
        player.addForce(k.vec2(1.0, 0.0).scale(player.speed * k.dt()));
    });
    player.onKeyDown("a", () => {
        player.addForce(k.vec2(-1.0, 0.0).scale(player.speed * k.dt()));
    });
    player.onKeyDown("s", () => {
        player.addForce(k.vec2(0.0, 1.0).scale(player.speed * k.dt()));
    });
    player.onKeyDown("w", () => {
        player.addForce(k.vec2(0.0, -1.0).scale(player.speed * k.dt()));
    });

    player.on("death", () => {
        player.destroy();
    });

    // add gun
    const gun = createGun();
    player.add(gun)

    return player;
}