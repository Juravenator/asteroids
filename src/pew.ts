import { game } from "./canvas";
import { shipData } from "./ship";

type Pew = {
    x: number,
    y: number,
    vx: number,
    vy: number,
    rot: number,
};
const pews: Pew[] = [];

const pewp = new Path2D();
pewp.moveTo(0, 0);
pewp.lineTo(0, 5);

export const draw = () => {
    for (let i = 0; i < pews.length; i++) {
        const pew = pews[i]!;
        game.context.resetTransform();
        game.context.translate(pew.x, pew.y);
        game.context.rotate(pew.rot);
        game.context.stroke(pewp);
    }
};

export const move = () => {
    for (let i = 0; i < pews.length; i++) {
        const pew = pews[i]!;
        pew.x += pew.vx;
        pew.y += pew.vy;
        if (pew.x < 0 || pew.x > window.innerWidth || pew.y < 0 || pew.y > window.innerHeight) {
            pews.splice(i, 1);
            i--;
        }
    }
};

export const pew = () => {
    const rot = shipData.rot;
    const x = shipData.x + (Math.sin(rot) * 20);
    const y = shipData.y - (Math.cos(rot) * 20);
    const vx = shipData.vx + (Math.sin(rot) * 3);
    const vy = -shipData.vy - (Math.cos(rot) * 3);
    pews.push({x, y, vx, vy, rot})
};
