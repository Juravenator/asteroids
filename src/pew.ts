import { canvas, context } from "./canvas";
import { shipData } from "./ship";
import * as score from "./score";

export type Pew = {
    x: number,
    y: number,
    vx: number,
    vy: number,
    rot: number,
};
export const pews: Pew[] = [];

export const draw = () => {
    for (let i = 0; i < pews.length; i++) {
        const pew = pews[i]!;
        context.resetTransform();
        context.translate(pew.x, pew.y);
        context.rotate(pew.rot);
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, 5);
        context.stroke();
    }
};

export const move = () => {
    for (let i = 0; i < pews.length; i++) {
        const pew = pews[i]!;
        pew.x += pew.vx;
        pew.y += pew.vy;
        if (pew.x < 0 || pew.x > canvas.width || pew.y < 0 || pew.y > canvas.height) {
            destroy(i)
            i--;
        }
    }
};

export const destroy = (i: number) => {
    pews.splice(i, 1);
}

export const pew = () => {
    const rot = shipData.rot;
    const x = shipData.x + (Math.sin(rot) * 20);
    const y = shipData.y - (Math.cos(rot) * 20);
    const vx = shipData.vx + (Math.sin(rot) * 3);
    const vy = -shipData.vy - (Math.cos(rot) * 3);
    pews.push({x, y, vx, vy, rot})
    if (score.data.score) {
        score.data.score -= 1;
    }
};
