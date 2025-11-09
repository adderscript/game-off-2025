import { Vec2 } from 'kaplay';

export function pointInCircle(pointPos: Vec2, circlePos: Vec2, circleRad: number): boolean {
    const dx = pointPos.x - circlePos.x;
    const dy = pointPos.y - circlePos.y;
    const distanceSquared = dx * dx + dy * dy;
    return distanceSquared < circleRad * circleRad;
}