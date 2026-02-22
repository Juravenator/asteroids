import * as score from "./score";
import * as base from "./base";
import * as ship from "./ship";
import * as stuff from "./stuff";
import * as pew from "./pew";
import { play } from "./audio";
import { canvas, clearCanvas, context } from "./canvas";

base.draw();
ship.init();
stuff.init();

let left = false;
let right = false;
let up = false;
let spacepressed: number | null = null;
let enginesound: AudioBufferSourceNode | undefined;
addEventListener('keydown', e => {
    if (score.data.inputdisabled) {
        left = right = up = false;
        if (spacepressed) {
            clearInterval(spacepressed);
            spacepressed = null;
        }
        return
    }
    if (!score.data.firstinput) {
        score.reset();
        score.data.firstinput = true;
        ship.shipData.protected = null;
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
        if (state) {
            if (!enginesound) {
                enginesound = play('engine');
            }
        } else {
            if (enginesound) {
                enginesound.stop();
                enginesound = undefined;
            }
        }
    }
}

const maintext = (t: string) => {
    context.font = "48px 'Press Start 2P', system-ui";
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
    ship.draw(up);
    pew.draw();

    if ((score.data.died && score.data.lives == 0) || !score.data.firstinput) {
        if (score.data.died && window.performance.now() - score.data.died > 1000) {
            maintext(score.data.inputdisabled ? "game over" : "press to play")
        }
    }
};
requestAnimationFrame(frame);