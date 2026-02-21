import { game } from "./canvas";
import { cycleNum, drawExplosion } from "./stuff";

export type ShipData = {
    x: number,
    y: number,
    rot: number,
    v: number,
    vx: number,
    vy: number,
    vrot: number,
    destroyed: number | null,
}

const newShipData = (): ShipData => {
    return {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        rot: 0,
        vx: 0,
        vy: 0,
        vrot: .05,
        v: .1,
        destroyed: null as number | null,
    }
}
export let shipData = newShipData();
export const reset = () => {
    shipData = newShipData();
}

const shipp = new Path2D();
shipp.moveTo(-10, 10);
shipp.lineTo(0, -10);
shipp.lineTo(10, 10);
shipp.moveTo(-10, 5);
shipp.lineTo(10, 5);

export const collision_points = (): [number, number][] => {
    const points = [
        [-10, 10],
        [-5, 0],
        [0, -10],
        [5, 0],
        [10, 10],
        [0, 10]
    ];
    return points.map(([x, y]) => ([shipData.x + x!, shipData.y + y!]))
}

export const init = () => {
    draw();
}

export const draw = () => {
    game.context.resetTransform();
    game.context.translate(shipData.x, shipData.y);
    game.context.rotate(shipData.rot);
    if (shipData.destroyed) {
        const timediff = window.performance.now() - shipData.destroyed;
        if (timediff < 2000) {
            const evencycle = cycleNum(1000, 8, timediff) % 2;
            if (evencycle) {
                drawExplosion([10, 3], [20, 10], 3);
            } else {
                drawExplosion([15, 8], [25, 15]);
            }
        }
    } else {
        game.context.stroke(shipp);
    }
}

export const move = (left: boolean, right: boolean, up: boolean) => {
    if (left) {
        shipData.rot -= shipData.vrot
    }
    if (right) {
        shipData.rot += shipData.vrot
    }
    if (up) {
        shipData.vx += Math.sin(shipData.rot) * shipData.v;
        shipData.vy += Math.cos(shipData.rot) * shipData.v;
    }

    shipData.x += shipData.vx;
    shipData.y -= shipData.vy; // y in canvas is 0 at the top

    if (shipData.x < -20) {
        shipData.x = window.innerWidth + 20
    }
    if (shipData.x > window.innerWidth + 20) {
        shipData.x = -20;
    }
    if (shipData.y < -20) {
        shipData.y = window.innerHeight + 20
    }
    if (shipData.y > window.innerHeight + 20) {
        shipData.y = -20;
    }
};
