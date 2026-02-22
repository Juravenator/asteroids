import { canvas, context } from "./canvas";
import { cycleNum, drawExplosion } from "./stuff";
import * as score from "./score";

export type ShipData = {
    x: number,
    y: number,
    rot: number,
    v: number,
    vx: number,
    vy: number,
    vrot: number,
    protected: number | null,
    destroyed: number | null,
}

const newShipData = (): ShipData => {
    return {
        x: canvas.width / 2,
        y: canvas.height / 2,
        rot: 0,
        vx: 0,
        vy: 0,
        vrot: .05,
        v: .1,
        protected: window.performance.now(),
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

export const draw = (up = false) => {
    if (shipData.protected && score.data.firstinput) {
        const timediff = window.performance.now() - shipData.protected!;
        const evencycle = cycleNum(1000, 8, timediff) % 2;
        if (evencycle) {
            return;
        }
    }
    context.resetTransform();
    context.translate(shipData.x, shipData.y);
    context.rotate(shipData.rot);
    if (score.data.died && score.data.inputdisabled) {
        const timediff = window.performance.now() - shipData.destroyed!;
        if (timediff < 2000) {
            const evencycle = cycleNum(1000, 8, timediff) % 2;
            if (evencycle) {
                drawExplosion([10, 3], [20, 10], 3);
            } else {
                drawExplosion([15, 8], [25, 15]);
            }
        }
    } else {
        context.stroke(shipp);
        if (up) {
            context.moveTo(-5, 10);
            context.lineTo(0, 15);
            context.lineTo(5, 10);
            context.stroke();
        }
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
        shipData.x = canvas.width + 20
    }
    if (shipData.x > canvas.width + 20) {
        shipData.x = -20;
    }
    if (shipData.y < -20) {
        shipData.y = canvas.height + 20
    }
    if (shipData.y > canvas.height + 20) {
        shipData.y = -20;
    }
};
