import { drawBase } from "./base";
import * as ship from "./ship";
import * as stuff from "./stuff";

const base = document.getElementById('base')! as HTMLCanvasElement;
const basec = base.getContext('2d')!;

addEventListener('DOMContentLoaded', () => drawBase(base, basec))
addEventListener('resize', () => drawBase(base, basec))

ship.init();
ship.pew();
ship.redraw();
stuff.init();

let left = false;
let right = false;
let up = false;
let spacepressed: number | null = null;
addEventListener('keydown', e => {
    toggleKey(e.key, true);
    if (e.key == " ") {
        if (!spacepressed) {
            spacepressed = setInterval(() => ship.pew(), 200);
            ship.pew();
        }
    }
})
addEventListener('keyup', e => {
    toggleKey(e.key, false);
    if (e.key == " ") {
        if (spacepressed) {
            clearInterval(spacepressed);
            spacepressed = null;
        }
    }
})
const toggleKey = (key: string, state: boolean) => {
    if (key == "ArrowLeft") {
        left = state
    } else if (key == "ArrowRight") {
        right = state
    } else if (key == "ArrowUp") {
        up = state
    }
}

const frame = () => {
    requestAnimationFrame(frame);
    ship.frame(left, right, up);
    stuff.frame();
};
requestAnimationFrame(frame);