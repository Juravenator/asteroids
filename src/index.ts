import * as score from "./score";
import * as base from "./base";
import * as ship from "./ship";
import * as stuff from "./stuff";
import * as pew from "./pew";
import { canvas, clearCanvas, context } from "./canvas";

base.draw();
ship.init();
stuff.init();

let left = false;
let right = false;
let up = false;
let spacepressed: number | null = null;
addEventListener('keydown', e => {
    if (score.data.inputdisabled) {
        return
    }
    if (score.data.died) {
        score.reset()
    }
    toggleKey(e.key, true);
    if (e.key == " ") {
        if (!spacepressed) {
            spacepressed = setInterval(() => pew.pew(), 200);
            pew.pew();
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

const maintext = (t: string) => {
    const w = context.measureText(t).width;
    context.resetTransform();
    context.fillText(t, (canvas.width -w)/2, canvas.height / 4);
}

const frame = () => {
    requestAnimationFrame(frame);
    ship.move(left, right, up);
    stuff.move();
    pew.move();
    clearCanvas();
    base.draw();
    stuff.draw();
    ship.draw();
    pew.draw();

    if (score.data.died) {
        maintext(score.data.inputdisabled ? "game over" : "press to play")
    }
};
requestAnimationFrame(frame);